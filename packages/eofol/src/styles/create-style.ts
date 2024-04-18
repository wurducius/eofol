import { injectCSS } from "./dynamic-styles";

const createStyle = (style: string) => {
  injectCSS(style);
};

export default createStyle;
