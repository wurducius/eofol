import { ElementNode } from "../types/eofol-types";
import { arrayCombinator, appendChild } from "../util/util";

// @TODO TYPING
function createElement(
  tagName: string,
  className?: string,
  children?: ElementNode,
  attributes?: Record<string, string>,
  properties?: Record<string, string>
): HTMLElement {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  arrayCombinator(appendChild(element), children);

  if (attributes) {
    Object.keys(attributes).forEach((attributeName) => {
      element.setAttribute(attributeName, attributes[attributeName]);
    });
  }

  if (properties) {
    Object.keys(properties).forEach((name) => {
      // @ts-ignore
      element[name] = properties[name];
    });
  }

  return element;
}

module.exports = createElement;
