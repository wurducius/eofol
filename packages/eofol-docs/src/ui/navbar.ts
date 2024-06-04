import { a, div, p } from "@eofol/eofol-simple";
import { sx } from "@eofol/eofol";
import {
  EOFOL_NAME_PRETTY,
  ROUTER_INDEX,
  ROUTER_NAVBAR,
  RouterItem,
} from "../data";

// @TODO theme

type LinkState = "active" | "subtree" | "nonactive" | "base";

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
  } else if (state === "base") {
    return "primary";
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
  const isChildActive =
    item.subtree &&
    item.subtree.find((subitem) => subitem.link && isLinkActive(subitem.link));

  return isActive || isChildActive !== undefined
    ? div(
        item.subtree
          ? sx({
              padding: "16px 0 16px 0",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            })
          : undefined,
        [
          renderLink(item, isActive ? "active" : "base"),
          ...(item.subtree ?? []).map((item) =>
            renderLink(
              item,
              item.link && isLinkActive(item.link) ? "active" : "subtree"
            )
          ),
        ]
      )
    : renderLink(item, "nonactive");
}).flat();

export const navbar = (navbarElement: Element) => {
  return div(sx({ display: "flex", flexDirection: "column", gap: "16px" }), [
    a({
      link: ROUTER_INDEX,
      children: EOFOL_NAME_PRETTY,
      classname: sx({ fontSize: "24px", paddingBottom: "8px" }),
    }),
    ...navbarRouterMenu,
    navbarElement,
  ]);
};
