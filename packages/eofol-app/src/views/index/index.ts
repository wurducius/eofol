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
  createProjection,
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

const defineTabs = (
  tagName: string,
  data: { label: string; render: () => Element }[]
) =>
  defineBuiltinElement({
    tagName,
    classname: sx({ marginTop: "8px" }),
    initialState: { index: 0 },
    render: (state, setState) =>
      createElement("div", undefined, [
        createElement(
          "div",
          undefined,
          data.map(({ label }, index) =>
            createElement("button", "eofol-button", label, undefined, {
              // @ts-ignore
              onclick: () => {
                // @ts-ignore
                setState({ index });
              },
            })
          )
        ),
        // @ts-ignore
        createElement("div", undefined, data[state.index].render()),
      ]),
  });

defineTabs("eofol-tabs", [
  {
    label: "First",
    render: () => createElement("div", undefined, "Content 1"),
  },
  {
    label: "Second",
    render: () => createElement("div", undefined, "Content 2"),
  },
  {
    label: "Third",
    render: () => createElement("div", undefined, "Content 3"),
  },
]);

const renderCollapse =
  (
    label: string,
    render: undefined | (() => Element | string),
    onClick?: () => void
  ) =>
  (state: any, setState: any) =>
    createElement("div", undefined, [
      createElement(
        "div",
        sx({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }),
        [
          createElement(
            "img",
            sx({
              height: "24px",
              width: "24px",
              backgroundColor: "#278da6",
              marginRight: "8px",
            }),
            undefined,
            {
              src: svgPath,
              alt: "Arrow",
            }
          ),
          createElement("p", undefined, label),
        ],
        undefined,
        {
          // @ts-ignore
          onclick: () => {
            // @ts-ignore
            setState({ open: !state.open });
            if (onClick) {
              onClick();
            }
          },
        }
      ),
      // @ts-ignore
      createElement(
        "div",
        undefined,
        state.open && render ? render() : undefined
      ),
    ]);

const defineCollapse = (
  tagName: string,
  label: string,
  render: undefined | (() => Element | string),
  open?: boolean,
  onClick?: () => void
) =>
  defineBuiltinElement({
    tagName,
    initialState: { open },
    render: (state, setState) =>
      renderCollapse(label, render, onClick)(state, setState),
  });

defineCollapse("eofol-collapse", "Collapse", () => "Collapse content");

const defineAccordion = (
  tagName: string,
  data: { label: string; render: () => Element | string }[]
) => {
  defineBuiltinElement({
    tagName,
    initialState: { index: undefined },
    render: (state, setState) => {
      return data.map((item, index) =>
        createElement(
          "div",
          undefined,
          renderCollapse(
            item.label,
            // @ts-ignore
            () => item.render(),
            () => {
              setState && // @ts-ignore
                setState({ index: index !== state.index ? index : undefined });
            }
            // @ts-ignore
          )({ open: state.index === index }, () => {})
        )
      );
    },
  });
};

defineAccordion("eofol-accordion", [
  { label: "First", render: () => "Content 1" },
  { label: "Second", render: () => "Content 2" },
  { label: "Third", render: () => "Content 3" },
]);

const dashboardData = [
  { label: "Facebook", link: "https://facebook.com" },
  { label: "Youtube", link: "https://youtube.com" },
  { label: "Eofol", link: "https://eofol.com" },
  { label: "Eofol", link: "https://eofol.com" },
  { label: "Eofol", link: "https://eofol.com" },
  { label: "Eofol", link: "https://eofol.com" },
  { label: "Eofol", link: "https://eofol.com" },
  { label: "Eofol", link: "https://eofol.com" },
];

defineBuiltinElement({
  tagName: "eofol-dashboard",
  render: () =>
    createElement(
      "div",
      sx({ display: "flex" }),
      dashboardData.map((item) =>
        createElement(
          "a",
          [
            sx({ textDecoration: "none" }),
            sx({ transform: "scale(1.1)" }, "hover"),
          ],
          createElement("div", sx({ height: "100px", width: "100px" }), [
            createElement("img", sx({ backgroundColor: "grey" }), undefined, {
              src: svgPath,
              alt: `${item.label} icon`,
              height: "48px",
              width: "48px",
            }),
            createElement(
              "div",
              sx({ fontSize: "18px", color: "#90cdf4" }),
              item.label
            ),
          ]),
          { href: item.link }
        )
      )
    ),
});

createStore("selector-base", { data: "Initial state", moreData: "foobar" });

createProjection("selector-projection", "selector-base", (state) => ({
  derivedData: state.data,
}));

defineBuiltinElement({
  tagName: "eofol-selector-1",
  render: () => {
    return createElement(
      "button",
      "eofol-button",
      "Click to message projection",
      {},
      {
        // @ts-ignore
        onclick: () => {
          mergeStore("selector-base", { data: "Projection updated" });
        },
      }
    );
  },
});

defineBuiltinElement({
  tagName: "eofol-selector-2",
  subscribe: ["selector-projection"],
  render: () => {
    const projectionState = selector("selector-projection");

    return createElement(
      "p",
      undefined,
      projectionState.derivedData,
      {},
      {
        // @ts-ignore
        onclick: () => {
          mergeStore("selector-example", { data: "Projection updated" });
        },
      }
    );
  },
});
