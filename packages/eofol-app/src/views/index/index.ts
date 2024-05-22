import "../../styles/eofol.css";
import "./index.css";

import imgPath from "./rainbow-mountains-peru.jpg";
import svgPath from "./phi.svg";

import {
  registerServiceWorker,
  defineAutonomousElement,
  renderTarget,
  sx,
  createStore,
  setStore,
  selector,
  get,
  sy,
  defineBuiltinElement,
  mergeStore,
  createSelector,
  cx,
} from "@eofol/eofol";
import { StateSetter, StateTypeImpl } from "@eofol/eofol-types";
import { notify, p, div, button, h2 } from "@eofol/eofol-simple";

createStore("global", { count: 0 });

sy({ backgroundImage: `url(${imgPath})` }, "<body>");

const svgElement: HTMLImageElement | null = <HTMLImageElement>(
  document.getElementById("eofol-svg")
);

if (svgElement) {
  svgElement.src = svgPath;
}

interface CountState {
  count: number;
}

renderTarget<CountState>("eofol-target", {
  render: (
    state: StateTypeImpl<CountState> | undefined,
    setState: StateSetter<CountState> | undefined
  ) => {
    // wrong typing
    const s = state as CountState;

    return [
      h2(
        "Targeted element example",
        cx(sx({ color: "blue" }), sx({ color: "red" }, ":hover"))
      ),
      p(`Click count: ${s.count}`),
      button({
        classname: "eofol-button",
        children: "Click!",
        onClick: () => {
          // wrong setState typing
          setState && setState({ count: s.count + 1 });
        },
      }),
      button({
        classname: "eofol-button",
        children: "Reset",
        onClick: () => {
          // wrong setState typing
          setState && setState({ count: 0 });
        },
      }),
    ];
  },
  initialState: { count: 0 },
});

defineAutonomousElement<CountState>({
  tagName: "eofol-custom-single",
  render: () => {
    const store = selector("global");
    const count = store.count;

    const clickHandler = () => {
      setStore("global", { count: count + 1 });
    };
    const resetHandler = () => {
      setStore("global", { count: 0 });
    };

    return [
      h2(
        "Custom autonomous element using global store example",
        sx({ color: "blue", marginTop: "8px" })
      ),
      p(`Click count: ${count}`),
      div(undefined, [
        button({
          classname: "eofol-button",
          children: "Click!",
          onClick: clickHandler,
        }),
        button({
          classname: "eofol-button",
          children: "Reset",
          onClick: resetHandler,
        }),
      ]),
    ];
  },
  initialState: { count: 0 },
  subscribe: ["global"],
});

type WeatherState = {
  temperature: number | "LOADING" | "ERROR" | undefined;
};

const getWeatherState = (state: WeatherState) => {
  if (state.temperature === undefined) {
    return "";
  } else if (state.temperature === "LOADING") {
    return "Loading...";
  } else if (state.temperature === "ERROR") {
    return "Error";
  } else {
    return `${state.temperature}°C`;
  }
};

defineAutonomousElement<WeatherState>({
  tagName: "eofol-weather",
  render: (state: StateTypeImpl<WeatherState>) => [
    h2("Effect example", sx({ color: "blue", marginTop: "8px" })),
    p(getWeatherState(state as WeatherState)),
  ],
  initialState: { temperature: undefined },
  effect: [
    () => {
      console.log("effect invocation");
      return () => {
        console.log("effect cleanup");
      };
    },
    (
      state: StateTypeImpl<WeatherState> | undefined,
      setState: StateSetter<WeatherState> | undefined
    ) => {
      const s = state as WeatherState;
      if (s.temperature === undefined) {
        // wrong effect setState typing
        setState && setState({ temperature: "LOADING" });
        get(
          "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=50.32&lon=16.63"
        )
          .then((data) => {
            const temperature =
              data.properties.timeseries[0].data.instant.details
                .air_temperature;
            setState && setState({ temperature });
          })
          .catch(() => {
            setState && setState({ temperature: "ERROR" });
          });
      }
    },
  ],
});

defineBuiltinElement<CountState>({
  tagName: "eofol-builtin",
  initialState: { count: 0 },
  render: (state, setState) => [
    h2(
      "Custom built-in element example",
      sx({ color: "blue", marginTop: "8px" })
    ),
    // @ts-ignore
    p(`Click count: ${state.count}`),
    div(undefined, [
      button({
        classname: "eofol-button",
        children: "Click!",
        onClick: () => {
          // @ts-ignore
          setState({ count: state.count + 1 });
        },
      }),
      button({
        classname: "eofol-button",
        children: "Reset",
        onClick: () => {
          // @ts-ignore
          setState({ count: 0 });
        },
      }),
    ]),
  ],
});

createStore("selector-base", { data: "Initial state", moreData: "foobar" });

const derivedData = createSelector("selector-base", (state) => ({
  derivedData: state.data,
}));

defineBuiltinElement({
  tagName: "eofol-selector-1",
  render: () => {
    return button({
      classname: "eofol-button",
      children: "Click to message projection",
      onClick: () => {
        mergeStore("selector-base", { data: "Projection updated" });
        notify({ title: "Projection updated!", position: "top" });
      },
    });
  },
});

defineBuiltinElement({
  tagName: "eofol-selector-2",
  subscribe: [derivedData.name],
  render: () => {
    const projectionState = derivedData.selector();
    return p(projectionState.derivedData);
  },
});

registerServiceWorker();
