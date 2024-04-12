import { defineBuiltinElement, createElement } from "@eofol/eofol";
import { renderCollapse } from "../collapse/collapse";

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

export default defineAccordion;
