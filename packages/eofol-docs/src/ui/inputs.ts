import { div } from "@eofol/eofol-simple";
import { sx } from "@eofol/eofol";

const inputFieldStyle = sx({ width: "240px", margin: "32px auto 32px auto" });

export const inputField = (element: Element) => div(inputFieldStyle, element);
