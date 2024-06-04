import { div } from "@eofol/eofol-simple";
import { sx } from "@eofol/eofol";

const inputFieldStyle = sx({ width: "240px", margin: "0 0 0 0" });

export const inputField = (element: Element) => div(inputFieldStyle, element);
