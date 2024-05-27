import {
  EofolElementCreator,
  EofolSimplifiedElementCreator,
} from "@eofol/eofol-types";
import { createElement } from "@eofol/eofol";

export const elementFactory =
  (tagName: string): EofolElementCreator =>
  (classname, children, attributes, properties) =>
    createElement(tagName, classname, children, attributes, properties);

export const simplifiedElementFactory =
  (tagName: string): EofolSimplifiedElementCreator =>
  (content, classname, attributes, properties) =>
    createElement(tagName, classname, content, attributes, properties);
