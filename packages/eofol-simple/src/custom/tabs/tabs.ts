import { defineBuiltinElement, sx, createElement, sy } from "@eofol/eofol";

const DEFAULT_ICON = "";

const defineTabs = ({
  tagName,
  data,
  icon,
}: {
  tagName: string;
  data: { title: string; render: () => Element }[];
  icon?: string;
}) =>
  defineBuiltinElement({
    tagName,
    classname: sx({ marginTop: "8px" }),
    initialState: { index: 0 },
    render: (state, setState) =>
      createElement("div", undefined, [
        createElement(
          "div",
          sy({ display: "flex", justifyContent: "center" }, "tabs-header"),
          data.map(({ title }, index) =>
            createElement(
              "button",
              [
                "eofol-button",
                sy({ display: "flex", alignItems: "center" }, "tabs-button"),
              ],
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
                    src: icon ?? DEFAULT_ICON,
                    alt: "Open tab",
                  }
                ),
                title,
              ],
              undefined,
              {
                // @ts-ignore
                onclick: () => {
                  // @ts-ignore
                  setState({ index });
                },
              }
            )
          )
        ),
        // @ts-ignore
        createElement("div", undefined, data[state.index].render()),
      ]),
  });

export default defineTabs;
