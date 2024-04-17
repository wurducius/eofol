import { defineBuiltinElement, sx, createElement } from "@eofol/eofol";

const defineTabs = ({
  tagName,
  data,
}: {
  tagName: string;
  data: { title: string; render: () => Element }[];
}) =>
  defineBuiltinElement({
    tagName,
    classname: sx({ marginTop: "8px" }),
    initialState: { index: 0 },
    render: (state, setState) =>
      createElement("div", undefined, [
        createElement(
          "div",
          undefined,
          data.map(({ title }, index) =>
            createElement("button", "eofol-button", title, undefined, {
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

export default defineTabs;
