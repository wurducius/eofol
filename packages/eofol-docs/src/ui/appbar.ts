import { div, p } from "@eofol/eofol-simple";
import { getTheme, sx } from "@eofol/eofol";
import { iconMenu } from "./icon-menu";
import { themeToggle } from "./theme-toggle";

export const APPBAR_CONTENT_HEIGHT_PX = 24;
export const APPBAR_PADDING_PX = 8;
export const APPBAR_HEIGHT_PX =
  APPBAR_CONTENT_HEIGHT_PX + 2 * APPBAR_PADDING_PX;

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
    }),
    [
      div(sx({ display: "flex", flex: 1, justifyContent: "flex-start" }), [
        p(
          "All inclusive web framework with zero configuration, batteries included!"
        ),
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
          themeToggle(),
        ]
      ),
    ]
  );
};
