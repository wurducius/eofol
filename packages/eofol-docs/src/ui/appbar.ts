import { div, p } from "@eofol/eofol-simple";
import { getTheme, sx } from "@eofol/eofol";
import { iconMenu } from "./icon-menu";
import { themeToggle } from "./theme-toggle";
import {
  APPBAR_CONTENT_HEIGHT_PX,
  APPBAR_PADDING_PX,
  EOFOL_META_DESCRIPTION,
} from "../data";

export const appbar = () => {
  const theme = getTheme();

  return div(
    sx({
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      height: `${APPBAR_CONTENT_HEIGHT_PX}px`,
      padding: `${APPBAR_PADDING_PX}px 32px`,
      backgroundColor: theme.color.background.card,
      zIndex: 100,
    }),
    [
      div(sx({ display: "flex", flex: 1, justifyContent: "flex-start" }), [
        p(EOFOL_META_DESCRIPTION),
      ]),
      div(
        sx({
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }),
        [
          p("Version 0.2", sx({ marginRight: "24px" })),
          iconMenu(),
          div(sx({ marginRight: "24px" })),
          themeToggle(),
        ]
      ),
    ]
  );
};
