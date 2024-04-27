import { arrayCombinator } from "../util/util";
import { appendChild } from "../util/dom";
import { EofolElementNode, EofolClassname } from "@eofol/eofol-types";
import { cx } from "../util/simple";

const injectElementProps = (
  element: HTMLElement,
  classname?: EofolClassname,
  children?: EofolElementNode | string | string[],
  attributes?: Record<string, string>,
  properties?: Record<string, string>
): HTMLElement => {
  if (classname) {
    if (Array.isArray(classname)) {
      element.className = cx(...classname.flat());
    } else {
      element.className = cx(classname);
    }
  }

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

  arrayCombinator(appendChild(element), children);

  return element;
};

// @TODO TYPING
export const createElement = (
  tagName: string,
  classname?: EofolClassname,
  children?: EofolElementNode | string | string[],
  attributes?: Record<string, string>,
  properties?: Record<string, string>
): HTMLElement =>
  injectElementProps(
    document.createElement(tagName),
    classname,
    children,
    attributes,
    properties
  );

const createCustomElementByClass = (
  CustomClass: CustomElementConstructor,
  classname?: EofolClassname,
  children?: EofolElementNode | string | string[],
  attributes?: Record<string, string>,
  properties?: Record<string, string>
) =>
  injectElementProps(
    new CustomClass(),
    classname,
    children,
    attributes,
    properties
  );

const createCustomElement = (
  tagName: string,
  classname?: EofolClassname,
  children?: EofolElementNode | string | string[],
  attributes?: Record<string, string>,
  properties?: Record<string, string>
) => {
  const CustomClass = customElements.get(tagName);

  if (CustomClass) {
    return createCustomElementByClass(
      CustomClass,
      classname,
      children,
      attributes,
      properties
    );
  } else {
    return "No definition found for custom element " + tagName;
  }
};

const e = (
  tagName: string,
  classname?: EofolClassname,
  children?: EofolElementNode | string | string[],
  attributes?: Record<string, string>,
  properties?: Record<string, string>
) => {
  const CustomClass = customElements.get(tagName);

  if (CustomClass) {
    return createCustomElementByClass(
      CustomClass,
      classname,
      children,
      attributes,
      properties
    );
  } else {
    return createElement(tagName, classname, children, attributes, properties);
  }
};

export default { createElement, createCustomElement, e };
