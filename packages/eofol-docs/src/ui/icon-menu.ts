import { a, div, img } from "@eofol/eofol-simple";
import githubPath from "../assets/github.svg";
import mailPath from "../assets/mail.svg";
import linkedinPath from "../assets/linkedin.svg";
import npmPath from "../assets/phi.svg";
import {
  GITHUB_EOFOL_LINK,
  LINKEDIN_LINK,
  MAIL_MAILTO_LINK,
  MENU_ICON_SIZE,
  NPM_EOFOL_LINK,
} from "../data";
import { sx } from "@eofol/eofol";

const temporaryHackStyle = sx({
  marginTop: "3px",
});

const hoverIconStyle = sx(
  {
    filter: `invert(72%) sepia(16%) saturate(3867%) hue-rotate(188deg) brightness(100%) contrast(101%);`,
  },
  ":hover"
);

export const iconMenu = () => {
  return div(undefined, [
    a({
      link: GITHUB_EOFOL_LINK,
      external: true,
      children: img({
        src: githubPath,
        alt: "Github icon",
        classname: [temporaryHackStyle, hoverIconStyle],
        height: MENU_ICON_SIZE,
        width: MENU_ICON_SIZE,
      }),
    }),
    a({
      link: NPM_EOFOL_LINK,
      external: true,
      children: img({
        src: npmPath,
        alt: "NPM icon",
        classname: [temporaryHackStyle, hoverIconStyle],
        height: MENU_ICON_SIZE,
        width: MENU_ICON_SIZE,
      }),
    }),
    a({
      link: MAIL_MAILTO_LINK,
      external: true,
      children: img({
        src: mailPath,
        alt: "Email icon",
        height: MENU_ICON_SIZE,
        width: MENU_ICON_SIZE,
      }),
      classname: [temporaryHackStyle, hoverIconStyle],
    }),
    a({
      link: LINKEDIN_LINK,
      external: true,
      children: img({
        src: linkedinPath,
        alt: "Linkedin icon",
        height: MENU_ICON_SIZE,
        width: MENU_ICON_SIZE,
      }),
      classname: [temporaryHackStyle, hoverIconStyle],
    }),
  ]);
};
