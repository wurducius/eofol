import { getTheme, sx } from "@eofol/eofol";
import { div } from "../primitive/div";

export const bubble = (title: string, open: boolean) => {
  const theme = getTheme();

  return div(
    sx({
      position: "absolute",
      display: open ? "block" : "none",
      color: theme.color.error,
      padding: "6px",
      fontSize: theme.typography.text.fontSize,
      backgroundColor: "rgb(17, 17, 17)",
      width: "calc(100% - 12px)",
      zIndex: 10,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "rgb(221, 221, 221)",
    }),
    title
  );
};

export default { bubble };
