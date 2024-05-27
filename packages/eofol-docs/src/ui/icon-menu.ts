import { a, div, img } from "@eofol/eofol-simple";
import githubPath from "../assets/github.svg";
import { GITHUB_EOFOL_LINK } from "../data/constants";

export const iconMenu = () => {
  return div(undefined, [
    a({
      link: GITHUB_EOFOL_LINK,
      children: img({ src: githubPath, alt: "Github icon" }),
    }),
    a({
      link: GITHUB_EOFOL_LINK,
      children: img({ src: githubPath, alt: "Github icon" }),
    }),
    a({
      link: GITHUB_EOFOL_LINK,
      children: img({ src: githubPath, alt: "Github icon" }),
    }),
    a({
      link: GITHUB_EOFOL_LINK,
      children: img({ src: githubPath, alt: "Github icon" }),
    }),
  ]);
};
