import "./index.css";

import imgPath from "./rainbow-mountains-peru.jpg";
import svgPath from "./phi.svg";

import {
  createElement,
  registerServiceWorker,
  defineCustomElement,
  renderTarget,
  sx,
  createStore,
  setStore,
  select,
  mergeStore,
} from "@eofol/eofol";
import { StateSetter } from "@eofol/eofol-types";

createStore("global", { count: 0 });

document.body.setAttribute("style", `background-image: url(.${imgPath});`);

const svgElement: HTMLImageElement | null = <HTMLImageElement>(
  document.getElementById("eofol-svg")
);

if (svgElement) {
  svgElement.src = svgPath;
}

interface CountState {
  count: number;
}

renderTarget("eofol-target", {
  render: () => {
    const store = select("global");
    const count = store.count;

    return [
      createElement("div", sx({ color: "blue" }), "Targeted element example"),
      createElement("div", undefined, `Click count: ${count}`),
      createElement("button", "eofol-button", "Click!", undefined, {
        onclick: () => {
          setStore("global", { count: count + 1 });
        },
      }),
      createElement("button", "eofol-button", "Reset", undefined, {
        onclick: () => {
          mergeStore("global", { count: 0 });
        },
      }),
    ];
  },
  initialState: { count: 0 },
  subscribe: ["global"],
});

defineCustomElement({
  tagName: "eofol-custom-single",
  render: (state: CountState, setState: StateSetter<CountState>) => {
    const clickHandler = () => {
      setState({ count: (state.count ?? 0) + 1 });
    };
    const resetHandler = () => {
      setState({ count: 0 });
    };

    return [
      createElement("div", sx({ color: "blue" }), "Custom tag element example"),
      createElement("div", undefined, `Click count: ${state.count}`),
      createElement("div", "", [
        createElement("button", "eofol-button", "Click!", undefined, {
          onclick: clickHandler,
        }),
        createElement("button", "eofol-button", "Reset", undefined, {
          onclick: resetHandler,
        }),
      ]),
    ];
  },
  initialState: { count: 0 },
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

defineCustomElement({
  tagName: "eofol-weather",
  render: (state: WeatherState) => [
    createElement("div", sx({ color: "blue" }), "Effect example"),
    createElement("div", undefined, getWeatherState(state)),
  ],
  initialState: { temperature: undefined },
  effect: [
    () => {
      console.log("effect invocation");
      return () => {
        console.log("effect cleanup");
      };
    },
    (state: WeatherState, setState: StateSetter<WeatherState>) => {
      if (state.temperature === undefined) {
        setState({ temperature: "LOADING" });
        fetch(
          "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=50.32&lon=16.63"
        )
          .then((res) => res.json())
          .then((data) => {
            const temperature =
              data.properties.timeseries[0].data.instant.details
                .air_temperature;
            setState({ temperature });
          })
          .catch((e) => {
            setState({ temperature: "ERROR" });
          });
      }
    },
  ],
});

registerServiceWorker();
