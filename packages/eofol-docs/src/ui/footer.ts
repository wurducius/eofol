import { p, div } from "@eofol/eofol-simple";
import { sx } from "@eofol/eofol";
import { footerContainer } from "./section-container";

export const footer = () => {
  return footerContainer([
    p("Made in Czech Republic by Jakub Eliáš"),
    div(sx({ marginTop: "32px", display: "flex", justifyContent: "center" }), [
      "TODO icons",
    ]),
  ]);
};
