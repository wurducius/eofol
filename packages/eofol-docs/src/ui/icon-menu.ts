import { a, div, img } from "@eofol/eofol-simple";
import githubPath from "../assets/github.svg";
import { GITHUB_EOFOL_LINK } from "../data";
import { sx } from "@eofol/eofol";

const temporaryHackStyle = sx({ marginTop: "3px" });

export const iconMenu = () => {
  return div(undefined, [
    a({
      link: GITHUB_EOFOL_LINK,
      children: img({
        src: githubPath,
        alt: "Github icon",
        classname: temporaryHackStyle,
      }),
    }),
    a({
      link: GITHUB_EOFOL_LINK,
      children: img({ src: githubPath, alt: "Github icon" }),
      classname: temporaryHackStyle,
    }),
    a({
      link: GITHUB_EOFOL_LINK,
      children: img({ src: githubPath, alt: "Github icon" }),
      classname: temporaryHackStyle,
    }),
    a({
      link: GITHUB_EOFOL_LINK,
      children: img({ src: githubPath, alt: "Github icon" }),
      classname: temporaryHackStyle,
    }),
  ]);
};
