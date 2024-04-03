import "../../styles/eofol.css";
import "./index.css";

import imgPath from "./rainbow-mountains-peru.jpg";
import svgPath from "./phi.svg";

import {
  createElement,
  registerServiceWorker,
  defineAutonomousElement,
  renderTarget,
  sx,
  createStore,
  setStore,
  selectStore,
  get,
  sy,
  defineBuiltinElement,
} from "@eofol/eofol";
import { StateSetter, StateTypeImpl } from "@eofol/eofol-types";

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
      createElement(
        "div",
        [sx({ color: "blue" }), sx({ color: "red" }, "hover")],
        "Targeted element example"
      ),
      createElement("div", undefined, `Click count: ${s.count}`),
      createElement("button", "eofol-button", "Click!", undefined, {
        // @ts-ignore
        onclick: () => {
          // wrong setState typing
          setState && setState({ count: s.count + 1 });
        },
      }),
      createElement("button", "eofol-button", "Reset", undefined, {
        // @ts-ignore
        onclick: () => {
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
    const store = selectStore("global");
    const count = store.count;

    const clickHandler = () => {
      setStore("global", { count: count + 1 });
    };
    const resetHandler = () => {
      setStore("global", { count: 0 });
    };

    return [
      createElement(
        "div",
        sx({ color: "blue", marginTop: "8px" }, undefined, true),
        "Custom autonomous element using global store example"
      ),
      createElement("div", undefined, `Click count: ${count}`),
      createElement("div", "", [
        createElement("button", "eofol-button", "Click!", undefined, {
          // @ts-ignore
          onclick: clickHandler,
        }),
        createElement("button", "eofol-button", "Reset", undefined, {
          // @ts-ignore
          onclick: resetHandler,
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
    createElement(
      "div",
      sx({ color: "blue", marginTop: "8px" }, undefined, true),
      "Effect example"
    ),
    createElement("div", undefined, getWeatherState(state as WeatherState)),
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
    createElement(
      "div",
      sx({ color: "blue", marginTop: "8px" }, undefined, true),
      "Custom built-in element example"
    ),
    // @ts-ignore
    createElement("div", undefined, `Click count: ${state.count}`),
    createElement("div", "", [
      createElement("button", "eofol-button", "Click!", undefined, {
        // @ts-ignore
        onclick: () => {
          // @ts-ignore
          setState({ count: state.count + 1 });
        },
      }),
      createElement("button", "eofol-button", "Reset", undefined, {
        // @ts-ignore
        onclick: () => {
          // @ts-ignore
          setState({ count: 0 });
        },
      }),
    ]),
  ],
});

registerServiceWorker();

defineBuiltinElement({
  tagName: "eofol-primitive",
  classname: sx({ marginTop: "8px" }),
  render: (state, setState, attributes) => {
    // @ts-ignore
    return attributes?.customattribute === "1"
      ? "custom attribute present"
      : "custom attribute not present";
  },
});
