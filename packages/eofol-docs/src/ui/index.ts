import { EofolElementNode } from "@eofol/eofol-types";
import { createElement, sx } from "@eofol/eofol";

export * from "./appbar";
export * from "./footer";
export * from "./icon-menu";
export * from "./section-container";
export * from "./content";
export * from "./inputs";
export * from "./layout";
export * from "./navbar";
export * from "./page";
export * from "./theme-toggle";

export const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus consequat tempor. Sed vitae quam at libero molestie vehicula non vel sem. Integer tellus justo, sagittis sit amet diam id, maximus elementum orci. Praesent sodales facilisis tincidunt. Suspendisse sed pretium augue. Vivamus aliquam sodales risus. Donec condimentum lorem eget gravida congue. Curabitur at nulla a sapien malesuada bibendum. Maecenas cursus mattis mauris nec pharetra. Aliquam viverra quam non justo blandit tempus. Vestibulum sit amet faucibus leo, aliquam egestas purus.";

export const shortLoremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export const foxJumpsOverLazyDog =
  "The quick brown fox jumps over the lazy dog.";

export const mathLoremIpsum = ["a", "2", " + b", "2", " = c", "2"];

export const unorderedListTag = (children: EofolElementNode) =>
  createElement("ul", sx({ textAlign: "left" }), children);

export const listItemTag = (children: EofolElementNode) =>
  createElement("li", sx({ marginTop: "8px" }), children);
