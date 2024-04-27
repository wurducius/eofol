import { EofolElementNode } from "@eofol/eofol-types";
import { createElement, cx, sx } from "@eofol/eofol";

const modal = (
  id: string,
  title: string,
  children: EofolElementNode,
  open: boolean,
  onClose: () => void,
  onConfirm: () => void,
  controls?: undefined | Element,
  classname?: string | undefined
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
        cx(
          sx({
            position: "relative",
            padding: "16px 16px 64px 16px",
            width: "80%",
            margin: "auto",
            border: "2px solid grey",
            backgroundColor: "#dddddd",
          }),
          classname
        ),
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
