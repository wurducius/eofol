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
  selector,
  get,
  sy,
  defineBuiltinElement,
  mergeStore,
  createSelector,
} from "@eofol/eofol";
import { StateSetter, StateTypeImpl } from "@eofol/eofol-types";
import {
  defineTabs,
  defineCollapse,
  defineAccordion,
  tooltip,
  notify,
} from "@eofol/eofol-simple";

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
    const store = selector("global");
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

defineTabs({
  tagName: "eofol-tabs",
  icon: svgPath,
  data: [
    {
      title: "First",
      render: () => createElement("div", undefined, "Content 1"),
    },
    {
      title: "Second",
      render: () => createElement("div", undefined, "Content 2"),
    },
    {
      title: "Third",
      render: () => createElement("div", undefined, "Content 3"),
    },
  ],
});

defineCollapse({
  tagName: "eofol-collapse",
  title: "Collapse",
  render: () => "Collapse content",
  iconOpen: svgPath,
  iconClosed: svgPath,
});

defineAccordion({
  tagName: "eofol-accordion",
  iconOpen: svgPath,
  iconClosed: svgPath,
  data: [
    { title: "First", render: () => "Content 1" },
    { title: "Second", render: () => "Content 2" },
    { title: "Third", render: () => "Content 3" },
  ],
});

createStore("selector-base", { data: "Initial state", moreData: "foobar" });

const derivedData = createSelector("selector-base", (state) => ({
  derivedData: state.data,
}));

defineBuiltinElement({
  tagName: "eofol-selector-1",
  render: () => {
    return tooltip(
      "Uses eofol store projection",
      createElement(
        "button",
        "eofol-button",
        "Click to message projection",
        {},
        {
          // @ts-ignore
          onclick: () => {
            mergeStore("selector-base", { data: "Projection updated" });
            notify({ title: "Projection updated!", position: "top" });
          },
        }
      )
    );
  },
});

defineBuiltinElement({
  tagName: "eofol-selector-2",
  subscribe: [derivedData.name],
  render: () => {
    const projectionState = derivedData.selector();
    return createElement("p", undefined, projectionState.derivedData);
  },
});
