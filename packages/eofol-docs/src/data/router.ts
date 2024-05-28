import {
  SHOWCASE_EOFOL_APP_LINK,
  SHOWCASE_SCALE_FIDDLE_LINK,
} from "./constants";

export const ROUTER_INDEX = "/index.html";
export const ROUTER_DOCS = "/docs.html";
export const ROUTER_GETTING_STARTED = "/getting-started.html";
export const ROUTER_COMPONENTS = "/components.html";
export const ROUTER_CORE = "/core.html";
export const ROUTER_STYLES = "/styles.html";
export const ROUTER_STATE_MANAGEMENT = "/state-management.html";
export const ROUTER_RUNTIME = "/runtime.html";
export const ROUTER_UTIL = "/util.html";
export const ROUTER_SHOWCASES = "/showcases.html";

export interface RouterItemFlat {
  link?: string;
  title: string;
  external?: boolean;
}

export interface RouterItem extends RouterItemFlat {
  subtree?: RouterItemFlat[];
}

export const ROUTER_NAVBAR: RouterItem[] = [
  { title: "Getting started", link: ROUTER_GETTING_STARTED },
  { title: "Eofol core", link: ROUTER_CORE },
  { title: "Eofol styles", link: ROUTER_STYLES },
  {
    title: "Components",
    link: ROUTER_COMPONENTS,
    subtree: [
      { title: "Button", link: ROUTER_DOCS },
      { title: "Input", link: ROUTER_DOCS },
      { title: "Number input", link: ROUTER_DOCS },
      { title: "Typography", link: ROUTER_DOCS },
    ],
  },
  { title: "State management", link: ROUTER_STATE_MANAGEMENT },
  { title: "Runtime", link: ROUTER_RUNTIME },
  { title: "Util", link: ROUTER_UTIL },
  {
    title: "Showcases",
    link: ROUTER_SHOWCASES,
    subtree: [
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
    ],
  },
];
