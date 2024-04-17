import { createElement, sx, defineBuiltinElement } from "@eofol/eofol";

const DEFAULT_ICON_OPEN = "";
const DEFAULT_ICON_CLOSED = "";

export const renderCollapse =
  ({
    title,
    render,
    onClick,
    iconOpen,
    iconClosed,
  }: {
    title: string;
    render: undefined | (() => Element | string);
    onClick?: () => void;
    iconOpen?: string;
    iconClosed?: string;
  }) =>
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
              src: state.open
                ? iconOpen ?? DEFAULT_ICON_OPEN
                : iconClosed ?? DEFAULT_ICON_CLOSED,
              alt: state.open ? "Close collapse" : "Open collapse",
            }
          ),
          createElement("p", undefined, title),
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

const defineCollapse = ({
  tagName,
  title,
  render,
  open,
  onClick,
}: {
  tagName: string;
  title: string;
  render: undefined | (() => Element | string);
  open?: boolean;
  onClick?: () => void;
}) =>
  defineBuiltinElement({
    tagName,
    initialState: { open },
    render: (state, setState) =>
      renderCollapse({ title, render, onClick })(state, setState),
  });

export default defineCollapse;
