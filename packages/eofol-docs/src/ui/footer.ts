import { p, div } from "@eofol/eofol-simple";
import { sx } from "@eofol/eofol";
import { footerContainer } from "./section-container";
import { iconMenu } from "./icon-menu";
import { EOFOL_DATETIME_BIRTHDAY, EOFOL_DATETIME_SIGNATURE } from "../data";

function getLang() {
  if (navigator.languages != undefined) return navigator.languages[0];
  return navigator.language;
}

const locale = getLang();

// @TODO add link to MIT license and mailto link
export const footer = () => {
  return footerContainer([
    p("Made in Czech Republic by Jakub Eliáš"),
    p(
      `Last updated on ${EOFOL_DATETIME_SIGNATURE.toLocaleString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}`
    ),
    p(
      `Project commenced ${EOFOL_DATETIME_BIRTHDAY.toLocaleString(locale, {
        year: "numeric",
        month: "long",
      })} in Vernéřovice`
    ),
    p("Licensed under the MIT license"),
    p("Copyright 2022-2024 Jakub Eliáš"),
    div(
      sx({ marginTop: "32px", display: "flex", justifyContent: "center" }),
      iconMenu()
    ),
  ]);
};
