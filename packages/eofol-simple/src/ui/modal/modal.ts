import { EofolElementNode } from "@eofol/eofol-types";
import { createElement, cx, getTheme, sx } from "@eofol/eofol";
import { button } from "../..";

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
  const theme = getTheme();

  return createElement(
    "div",
    sx({
      display: open ? "block" : "none",
      position: "fixed",
      zIndex: theme.zIndex.modal,
      paddingTop: "32px",
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
            padding: "16px 16px 16px 16px",
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
            button({
              children: "X",
              onClick: () => {
                onClose();
              },
            })
          ),
          createElement("div", sx({ fontSize: "32px" }), title),
          createElement("div", undefined, children),
          controls ??
            button({
              children: "Let's go",
              onClick: () => {
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
