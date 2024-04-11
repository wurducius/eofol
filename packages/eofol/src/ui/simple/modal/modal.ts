import { ElementNode } from "@eofol/eofol-types";
import { createElement, sx } from "../../..";

const modal = (
  id: string,
  title: string,
  children: ElementNode,
  open: boolean,
  onClose: () => void,
  onConfirm: () => void,
  controls?: undefined | Element
) => {
  return createElement(
    "div",
    sx({
      display: open ? "block" : "none",
      position: "fixed",
      zIndex: "1",
      paddingTop: "100px",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      overflow: "auto",
      backgroundColor: "rgba(0,0,0,0.4)",
    }),
    [
      createElement(
        "div",
        sx({
          position: "relative",
          padding: "16px 16px 64px 16px",
          width: "80%",
          margin: "auto",
          border: "2px solid grey",
          backgroundColor: "#dddddd",
        }),
        [
          createElement(
            "div",
            sx({ display: "flex", justifyContent: "flex-end" }),
            createElement(
              "button",
              undefined,
              "X",
              {},
              {
                // @ts-ignore
                onclick: () => {
                  onClose();
                },
              }
            )
          ),
          createElement("div", sx({ fontSize: "32px" }), title),
          createElement("div", undefined, children),
          controls ??
            createElement("button", undefined, "Let's go", undefined, {
              // @ts-ignore
              onclick: () => {
                onConfirm();
              },
            }),
        ],
        {},
        {
          // @ts-ignore
          onclick: (e) => {
            e.stopPropagation();
          },
        }
      ),
    ],
    { id },
    {
      // @ts-ignore
      onclick: () => {
        onClose();
      },
    }
  );
};

export default modal;
