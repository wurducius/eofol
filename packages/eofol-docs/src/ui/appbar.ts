import { div } from "@eofol/eofol-simple";
import { getTheme, sx } from "@eofol/eofol";

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
        "Eofol landing page link",
        "- Version",
        "- ?Search",
      ]),
      div(sx({ display: "flex", flex: 1, justifyContent: "flex-end" }), [
        "Todo icons",
        "- Theme toggle",
      ]),
    ]
  );
};
