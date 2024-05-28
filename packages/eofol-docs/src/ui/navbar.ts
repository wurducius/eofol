import { a, div, p } from "@eofol/eofol-simple";
import { getTheme, sx } from "@eofol/eofol";
import { ROUTER_INDEX, ROUTER_NAVBAR, RouterItem } from "../data";

type LinkState = "active" | "subtree" | "nonactive";

const isLinkActive = (link: string) => location.href.includes(link);

/*
const linkActiveStyle = sx({ color: "red" });

const linkSubtreeStyle = sx({ color: "purple !important;" });
*/

const getLinkStyle = (state: LinkState) => {
  if (state === "active") {
    return "primary";
  } else if (state === "subtree") {
    return "tertiary";
  } else {
    return "secondary";
  }
};

const renderLink = (item: RouterItem, state: LinkState) =>
  item.link
    ? a({
        children: item.title,
        link: item.link,
        external: item.external,
        scheme: getLinkStyle(state),
        classname:
          state === "subtree"
            ? [
                sx({
                  color: `#bb86fc !important;`,
                }),
                sx({ color: "#d7b8fe !important;" }, ":hover"),
              ]
            : undefined,
      })
    : div(sx({ margin: "8px 0 0 0", fontWeight: 700 }), p(item.title));

const navbarRouterMenu = ROUTER_NAVBAR.map((item) => {
  const isActive = item.link && isLinkActive(item.link);

  return isActive
    ? [
        renderLink(item, "active"),
        ...(item.subtree ?? []).map((item) => renderLink(item, "subtree")),
      ]
    : renderLink(item, "nonactive");
}).flat();

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
