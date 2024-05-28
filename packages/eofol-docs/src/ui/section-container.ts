import { div } from "@eofol/eofol-simple";
import { EofolElementNode } from "@eofol/eofol-types";
import { sx, getTheme } from "@eofol/eofol";
import {
  CONTAINER_PADDING_PX,
  FOOTER_HEIGHT_WITHOUT_PADDING_PX,
} from "../data";

const generalContainer =
  (maxWidth: string, minHeight: string, backgroundColor: string) =>
  (children: EofolElementNode) => {
    return div(
      sx({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight,
        backgroundColor,
        padding: `${CONTAINER_PADDING_PX}px`,
      }),
      div(sx({ margin: "0 auto 0 auto", maxWidth }), children)
    );
  };

export const sectionContainer = (children: EofolElementNode) => {
  const theme = getTheme();
  return generalContainer(
    "560px",
    "560px",
    theme.color.background.base
  )(children);
};

export const elevationContainer = (children: EofolElementNode) => {
  const theme = getTheme();
  return generalContainer(
    "560px",
    "560px",
    theme.color.background.elevation
  )(children);
};

export const footerContainer = (children: EofolElementNode) => {
  const theme = getTheme();
  return generalContainer(
    "560px",
    `${FOOTER_HEIGHT_WITHOUT_PADDING_PX}px`,
    theme.color.background.card
  )(children);
};
