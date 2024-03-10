import "./index.css";

import imgPath from "./rainbow-mountains-peru.jpg";
import svgPath from "./phi.svg";

import {
  createElement,
  registerServiceWorker,
  defineCustomElement,
  renderTarget,
  sx,
} from "@eofol/eofol";

// @ts-ignore
document.body.style = `background-image: url(.${imgPath});`;

const svgElement = document.getElementById("eofol-svg");

if (svgElement) {
  // @ts-ignore
  svgElement.src = svgPath;
}

type CountState = { count: number };

renderTarget<CountState>("eofol-target", {
  render: (state: CountState, setState: (nextState: CountState) => void) => [
    createElement(
      "div",
      sx({ color: "blue" }),
      "HELLO FUCKIN WORLD!!!!!! UwU Eoфol"
    ),
    createElement("div", undefined, "Count = " + state.count),
    createElement("button", "eofol-button", "Click!", undefined, {
      onclick: () => {
        setState({ count: state.count + 1 });
      },
    }),
  ],
  initialState: { count: 0 },
});

defineCustomElement({
  tagName: "eofol-custom-single",
  render: (state: CountState, setState: (nextState: CountState) => void) => {
    const clickHandler = () => {
      setState({ count: (state.count ?? 0) + 1 });
    };
    const resetHandler = () => {
      setState({ count: 0 });
    };

    return [
      createElement("div", sx({ color: "red" }), `Click count: ${state.count}`),
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

type WeatherState = { temperature: undefined | "LOADING" | "ERROR" | number };

const getState = (state: WeatherState) => {
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
  render: (state: WeatherState) => createElement("div", "", getState(state)),
  initialState: { temperature: undefined },
  effect: [
    (state: WeatherState) => {
      console.log("hello", state, new Date().getMilliseconds());
      return () => {
        console.log("cleanup", state, new Date().getMilliseconds());
      };
    },
    (state: WeatherState, setState: (nextState: WeatherState) => void) => {
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
