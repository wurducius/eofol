import { customElementRegistry, targetElementRegistry } from "./registry";

const forceRerender = () => {
  Object.keys(customElementRegistry).forEach((customElementName) => {
    const customElement = customElementRegistry[customElementName];
    customElement.setState(customElement.state);
  });
  Object.keys(targetElementRegistry).forEach((customElementName) => {
    const customElement = targetElementRegistry[customElementName];
    customElement.setState(customElement.state);
  });
};

export default forceRerender;
