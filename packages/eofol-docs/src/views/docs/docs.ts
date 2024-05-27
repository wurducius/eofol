import "../base.css";
import { defineBuiltinElement, getTheme, sx } from "@eofol/eofol";
import { container, div } from "@eofol/eofol-simple";
import { init } from "../../util";
import {
  APPBAR_HEIGHT_PX,
  FOOTER_HEIGHT_FULL_PX,
  appbar,
  content,
  footer,
  navbar,
} from "../../ui";

const NAVBAR_WIDTH_PX = 240;

const LAYOUT_CONTENT_PADDING_TOP_PX = 80;
const LAYOUT_CONTENT_PADDING_BOTTOM_PX = 128;

init();

const layout = () => {
  const theme = getTheme();

  return div(
    sx({
      display: "flex",
      height: `auto`,
    }),
    [
      div(
        sx({
          position: "fixed",
          top: `${APPBAR_HEIGHT_PX}px`,
          left: 0,
          bottom: 0,
          width: `${NAVBAR_WIDTH_PX}px`,
          backgroundColor: theme.color.background.elevation,
          overflow: "auto",
        }),
        div(
          sx({
            display: "flex",
            flexDirection: "column",
            padding: `40px 32px 24px 24px`,
          }),
          navbar()
        )
      ),
      div(
        sx({
          flex: 1,
          marginLeft: `${NAVBAR_WIDTH_PX}px`,
          height: "100%",
        }),
        div(undefined, [
          div(
            sx({
              padding: `${LAYOUT_CONTENT_PADDING_TOP_PX}px 48px ${LAYOUT_CONTENT_PADDING_BOTTOM_PX}px 48px`,
              minHeight: `calc(100vh - ${
                FOOTER_HEIGHT_FULL_PX +
                LAYOUT_CONTENT_PADDING_TOP_PX +
                LAYOUT_CONTENT_PADDING_BOTTOM_PX
              }px)`,
            }),
            content()
          ),
          footer(),
        ])
      ),
    ]
  );
};

defineBuiltinElement({
  tagName: "eofol-docs",
  render: () => {
    return container([appbar(), layout()], sx({ height: "100%" }));
  },
});
