export const SHOWCASE_EOFOL_APP_LINK = "https://eofol.com/showcase";
export const SHOWCASE_SCALE_FIDDLE_LINK = "https://eofol.com/fiddle";
export const GITHUB_EOFOL_LINK = "https://github.com/wurducius/eofol";
export const NPM_EOFOL_LINK = "https://www.npmjs.com/package/eofol";
export const LINKEDIN_LINK = "https://www.linkedin.com/in/jakubelias/";
export const MAIL_MAILTO_LINK = "mailto:wurducius@gmail.com";

export const ROUTER_INDEX = "/index.html";
export const ROUTER_DOCS = "/docs.html";

export const ROUTER_GETTING_STARTED = "/getting-started.html";
export const ROUTER_CREATE_EOFOL_APP = "/create-eofol-app.html";
export const ROUTER_COMPONENTS = "/components.html";
export const ROUTER_CORE = "/core.html";
export const ROUTER_STYLES = "/styles.html";
export const ROUTER_STATE_MANAGEMENT = "/state-management.html";
export const ROUTER_RUNTIME = "/runtime.html";
export const ROUTER_UTIL = "/util.html";
export const ROUTER_SHOWCASES = "/showcases.html";

const ROUTER_PREFIX_COMPONENT = "/components/";
export const ROUTER_COMPONENT_BUTTON = `${ROUTER_PREFIX_COMPONENT}button.html`;
export const ROUTER_COMPONENT_INPUT = `${ROUTER_PREFIX_COMPONENT}input.html`;
export const ROUTER_COMPONENT_NUMBER_INPUT = `${ROUTER_PREFIX_COMPONENT}number-input.html`;
export const ROUTER_COMPONENT_TYPOGRAPHY = `${ROUTER_PREFIX_COMPONENT}typography.html`;

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
  { title: "Create eofol app", link: ROUTER_CREATE_EOFOL_APP },
  { title: "Eofol core", link: ROUTER_CORE },
  { title: "Eofol styles", link: ROUTER_STYLES },
  {
    title: "Components",
    link: ROUTER_COMPONENTS,
    subtree: [
      { title: "Button", link: ROUTER_COMPONENT_BUTTON },
      { title: "Input", link: ROUTER_COMPONENT_INPUT },
      { title: "Number input", link: ROUTER_COMPONENT_NUMBER_INPUT },
      { title: "Typography", link: ROUTER_COMPONENT_TYPOGRAPHY },
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
