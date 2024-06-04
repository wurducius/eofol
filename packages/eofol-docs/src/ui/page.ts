import "../views/base.css";
import { defineBuiltinElement, sx } from "@eofol/eofol";
import { container, div } from "@eofol/eofol-simple";
import { init } from "../util";
import { appbar } from "./appbar";
import { layout } from "./layout";
import { EOFOL_DOCS_ROOT_CUSTOM_ELEMENT_TAG } from "../data";

export const page = (content: Element[]) => {
  init();

  const navbarElement = div(undefined, []);

  const contentElement = div(undefined, content);

  defineBuiltinElement({
    tagName: EOFOL_DOCS_ROOT_CUSTOM_ELEMENT_TAG,
    render: () => {
      return container(
        [appbar(), layout(navbarElement, contentElement)],
        sx({ height: "100%" })
      );
    },
  });
};
