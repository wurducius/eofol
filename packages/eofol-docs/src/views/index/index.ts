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
  listItemTag,
  unorderedListTag,
} from "@eofol/eofol-simple";
import { init } from "../../util";
import { elevationContainer, footer, sectionContainer } from "../../ui";
import {
  EOFOL_DOCS_ROOT_CUSTOM_ELEMENT_TAG,
  EOFOL_META_DESCRIPTION,
  EOFOL_NAME_PRETTY,
  GITHUB_EOFOL_LINK,
  ROUTER_GETTING_STARTED,
  SHOWCASE_EOFOL_APP_LINK,
  SHOWCASE_SCALE_FIDDLE_LINK,
  loremIpsum,
} from "../../data";

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
    classname: sx({ minWidth: "128px" }),
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
        margin: "0 0 16px 0",
      }),
    }),
    h1("Create reactive websites with a single dependency."),
    h2(`${EOFOL_NAME_PRETTY} - ${EOFOL_META_DESCRIPTION}`),
    div(sx({ marginTop: "32px", display: "flex", justifyContent: "center" }), [
      internalLinkButton({
        icon: arrowRightPath,
        title: "Get started",
        alt: "Right arrow",
        iconPosition: "right",
        link: ROUTER_GETTING_STARTED,
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
  return sectionContainer([
    h1("Built with eofol"),
    p("Your project can look as good as these! Check them out, get inspired!"),
    div(sx({ marginTop: "32px", display: "flex", justifyContent: "center" }), [
      externalLinkButton({
        link: SHOWCASE_EOFOL_APP_LINK,
        title: "See eofol-app showcase",
        icon: arrowRightPath,
        iconPosition: "right",
        alt: "Showcase eofol-app",
      }),
      externalLinkButton({
        link: SHOWCASE_SCALE_FIDDLE_LINK,
        title: "See Scale Fiddle showcase",
        icon: arrowRightPath,
        iconPosition: "right",
        alt: "Showcase Scale Fiddle",
      }),
    ]),
  ]);
};

const featuresSection = () => {
  return elevationContainer([
    h1(EOFOL_META_DESCRIPTION),
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
  tagName: EOFOL_DOCS_ROOT_CUSTOM_ELEMENT_TAG,
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
