import { a, div, p } from "@eofol/eofol-simple";
import { sx } from "@eofol/eofol/dist";
import { ROUTER_DOCS, ROUTER_INDEX } from "../data/router";
import {
  SHOWCASE_EOFOL_APP_LINK,
  SHOWCASE_SCALE_FIDDLE_LINK,
} from "../data/constants";

const ROUTER_NAVBAR = [
  { title: "Getting started", link: ROUTER_DOCS },
  { title: "Eofol core", link: ROUTER_DOCS },
  { title: "Eofol styles", link: ROUTER_DOCS },
  { title: "Components", link: ROUTER_DOCS },
  { title: "State management", link: ROUTER_DOCS },
  { title: "Runtime", link: ROUTER_DOCS },
  { title: "Util", link: ROUTER_DOCS },
  { title: "Showcases" },
  {
    title: "Eofol app",
    link: SHOWCASE_EOFOL_APP_LINK,
    external: true,
  },
  {
    title: "Scale fiddle",
    link: SHOWCASE_SCALE_FIDDLE_LINK,
    external: true,
  },
];

const navbarRouterMenu = ROUTER_NAVBAR.map((item) =>
  item.link
    ? a({
        children: item.title,
        link: item.link,
        external: item.external,
      })
    : div(sx({ margin: "8px 0 0 0", fontWeight: 700 }), p(item.title))
);

export const navbar = (navbarElement: Element) => {
  return div(sx({ display: "flex", flexDirection: "column", gap: "16px" }), [
    a({
      link: ROUTER_INDEX,
      children: "Eofol",
      classname: sx({ fontSize: "24px", paddingBottom: "8px" }),
    }),
    ...navbarRouterMenu,
    navbarElement,
  ]);
};
