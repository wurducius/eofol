import { defineBuiltinElement, createElement } from "@eofol/eofol";
import { renderCollapse } from "../collapse/collapse";

const defineAccordion = ({
  tagName,
  data,
  iconOpen,
  iconClosed,
}: {
  tagName: string;
  data: { title: string; render: () => Element | string }[];
  iconOpen?: string;
  iconClosed?: string;
}) => {
  defineBuiltinElement({
    tagName,
    initialState: { index: undefined },
    render: (state, setState) => {
      return data.map((item, index) =>
        createElement(
          "div",
          undefined,
          renderCollapse({
            title: item.title,
            // @ts-ignore
            render: () => item.render(),
            onClick: () => {
              setState && // @ts-ignore
                setState({ index: index !== state.index ? index : undefined });
            },
            iconOpen,
            iconClosed,
            // @ts-ignore
          })({ open: state.index === index }, () => {})
        )
      );
    },
  });
};

export default defineAccordion;
