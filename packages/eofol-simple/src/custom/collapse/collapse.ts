import { createElement, sx, defineBuiltinElement } from "@eofol/eofol";

export const renderCollapse =
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
              src: "",
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

export default defineCollapse;
