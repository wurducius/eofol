import "./index.css";
import svgPath from "../../assets/phi.svg";
import arrowRightPath from "../../assets/arrow-right.svg";
import githubPath from "../../assets/github.svg";
import {
  createElement,
  defineBuiltinElement,
  getTheme,
  mergeDeep,
  registerServiceWorker,
  setTheme,
  sx,
} from "@eofol/eofol";
import {
  p,
  div,
  container,
  h1,
  img,
  h2,
  linkButton,
  code,
} from "@eofol/eofol-simple";
import { EofolElementNode } from "@eofol/eofol-types";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus consequat tempor. Sed vitae quam at libero molestie vehicula non vel sem. Integer tellus justo, sagittis sit amet diam id, maximus elementum orci. Praesent sodales facilisis tincidunt. Suspendisse sed pretium augue. Vivamus aliquam sodales risus. Donec condimentum lorem eget gravida congue. Curabitur at nulla a sapien malesuada bibendum. Maecenas cursus mattis mauris nec pharetra. Aliquam viverra quam non justo blandit tempus. Vestibulum sit amet faucibus leo, aliquam egestas purus.";

/*
initTranslation([
  { title: "English", id: "en" },
  { title: "Čeština", id: "cs" },
]);
*/

const commonTheme = {
  typography: {
    text: {
      fontSize: "16px",
    },
    title: {
      fontSize: "20px",
    },
    heading: {
      fontSize: "24px",
    },
    tableSmall: {
      fontSize: "12px",
    },
  },
  shape: { borderRadius: "8px" },
  breakpoints: { values: [640, 1080, 1200, 1600, 2000, 2600] },
};

const cyanTheme = mergeDeep(commonTheme, {
  color: {
    primary: {
      base: "#03dac6",
    },
    secondary: {
      base: "#86b1ff",
    },
    tertiary: {
      base: "#278da6",
    },
    background: {
      base: "#121212",
      elevation: "#333333",
      card: "#2d3748",
    },
    font: "#03dac6",
    error: "#fc8181",
  },
});

setTheme(cyanTheme);
// const theme = setTheme(initialTheme);
// initStyles(theme);

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
        padding: "64px",
      }),
      div(sx({ margin: "0 auto 0 auto", maxWidth }), children)
    );
  };

const sectionContainer = (children: EofolElementNode) => {
  const theme = getTheme();
  return generalContainer(
    "560px",
    "640px",
    theme.color.background.base
  )(children);
};

const elevationContainer = (children: EofolElementNode) => {
  const theme = getTheme();
  return generalContainer(
    "560px",
    "640px",
    theme.color.background.elevation
  )(children);
};

const footerContainer = (children: EofolElementNode) => {
  const theme = getTheme();
  return generalContainer(
    "560px",
    "240px",
    theme.color.background.card
  )(children);
};

interface IconLinkProps {
  link: string;
  title: string;
  icon: string;
  alt: string;
  iconPosition?: "left" | "right";
  scheme?: "primary" | "secondary" | "tertiary";
}

const customLinkButton = ({
  link,
  title,
  icon,
  alt,
  iconPosition,
  external,
  scheme,
}: IconLinkProps & { external?: boolean }) => {
  const isIconPositionLeft = !iconPosition || iconPosition === "left";
  const content = isIconPositionLeft
    ? [
        img({
          src: icon,
          alt,
          height: "24px",
          width: "24px",
          classname: sx({ marginRight: "8px" }),
        }),
        title,
      ]
    : [
        title,
        img({
          src: icon,
          alt,
          height: "24px",
          width: "24px",
          classname: sx({ marginLeft: "8px" }),
        }),
      ];

  return linkButton({
    link,
    children: content,
    size: "2xl",
    external,
    scheme,
  });
};

const externalLinkButton = (props: IconLinkProps) =>
  customLinkButton({ ...props, external: true });

const internalLinkButton = (props: IconLinkProps) =>
  customLinkButton({ ...props, external: false });

const unorderedListTag = (children: EofolElementNode) =>
  createElement("ul", sx({ textAlign: "left" }), children);

const listItemTag = (children: EofolElementNode) =>
  createElement("li", sx({ marginTop: "8px" }), children);

const landingSection = () => {
  const theme = getTheme();

  // @TODO iconButton iconPosition github -> right

  return sectionContainer([
    img({
      src: svgPath,
      alt: "Greek letter phi",
      height: "128px",
      width: "128px",
      classname: sx({
        backgroundColor: theme.color.primary.base,
        margin: "0 0 64px 0",
      }),
    }),
    h1("Create reactive websites with a single dependency."),
    h2(
      "Eoфol - All inclusive web framework with zero configuration, batteries included!"
    ),
    div(sx({ marginTop: "32px", display: "flex", justifyContent: "center" }), [
      internalLinkButton({
        icon: arrowRightPath,
        title: "Get started",
        alt: "Right arrow",
        iconPosition: "right",
        link: "/get-started",
      }),
      externalLinkButton({
        icon: githubPath,
        title: "Github",
        alt: "Github",
        link: "https://github.com/wurducius/eofol",
        iconPosition: "right",
        scheme: "secondary",
      }),
    ]),
  ]);
};

const lessDependenciesSection = () => {
  return elevationContainer([
    h1("Less dependencies more speed"),
    h2(
      "Spend less time worrying about multiple dependencies and focus and user experience."
    ),
    code(loremIpsum),
    code(loremIpsum),
  ]);
};

const showcaseSection = () => {
  const theme = getTheme();

  return sectionContainer([
    h1("Built with eofol:"),
    p("Your project can look as good as these! Check them out, get inspired!"),
    div(sx({ marginTop: "32px", display: "flex", justifyContent: "center" }), [
      externalLinkButton({
        link: "https://eofol.com/showcase",
        title: "See showcase",
        icon: arrowRightPath,
        iconPosition: "right",
        alt: "Showcase",
      }),
    ]),
  ]);
};

const featuresSection = () => {
  return elevationContainer([
    h1(
      "All inclusive web framework with zero configuration, batteries included!"
    ),
    unorderedListTag([
      listItemTag(
        p(
          "Declaratively define custom tag html elements or render to DOM element"
        )
      ),
      listItemTag(p("Multiple entrypoints")),
      listItemTag(p("Global state management")),
      listItemTag(p("Dynamic styling in JS")),
      listItemTag(p("Typescript support")),
      listItemTag(p("Bundle and asset optimization out-of-the-box")),
      listItemTag(p("PWA support")),
    ]),
  ]);
};

const footer = () => {
  const theme = getTheme();

  return footerContainer([
    p("Made in Czech Republic by Jakub Eliáš"),
    div(sx({ marginTop: "32px", display: "flex", justifyContent: "center" }), [
      "TODO icons",
    ]),
  ]);
};

defineBuiltinElement({
  tagName: "eofol-docs",
  render: () => {
    return container([
      landingSection(),
      lessDependenciesSection(),
      showcaseSection(),
      featuresSection(),
      footer(),
    ]);
  },
});

registerServiceWorker();
