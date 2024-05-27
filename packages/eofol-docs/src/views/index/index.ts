import "../base.css";
import svgPath from "../../assets/phi.svg";
import arrowRightPath from "../../assets/arrow-right.svg";
import githubPath from "../../assets/github.svg";
import { defineBuiltinElement, getTheme, sx } from "@eofol/eofol";
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
import { init } from "../../util";
import {
  elevationContainer,
  footer,
  listItemTag,
  loremIpsum,
  sectionContainer,
  unorderedListTag,
} from "../../ui";
import { GITHUB_EOFOL_LINK } from "../../data/constants";
import { ROUTER_DOCS } from "../../data/router";

init();

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
        link: ROUTER_DOCS,
      }),
      externalLinkButton({
        icon: githubPath,
        title: "Github",
        alt: "Github",
        link: GITHUB_EOFOL_LINK,
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
