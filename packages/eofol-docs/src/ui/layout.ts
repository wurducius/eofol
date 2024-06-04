import { div } from "@eofol/eofol-simple";
import { getTheme, sx } from "@eofol/eofol";
import {
  APPBAR_HEIGHT_PX,
  NAVBAR_WIDTH_PX,
  LAYOUT_CONTENT_PADDING_TOP_PX,
  LAYOUT_CONTENT_PADDING_BOTTOM_PX,
  FOOTER_HEIGHT_FULL_PX,
} from "../data";
import { content } from "./content";
import { footer } from "./footer";
import { navbar } from "./navbar";

export const layout = (navbarElement: Element, contentElement: Element) => {
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
          navbar(navbarElement)
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
            content(contentElement)
          ),
          footer(),
        ])
      ),
    ]
  );
};
