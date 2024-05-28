import "../base.css";
import { defineBuiltinElement, sx } from "@eofol/eofol";
import { container, div, h1, h2, numberInput, p } from "@eofol/eofol-simple";
import { init } from "../../util";
import { appbar, layout, loremIpsum } from "../../ui";

init();

/*
  inputMode?: InputMode;
  precision?: number;
  pattern?: string;
  required?: boolean;
  readonly?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  spellcheck?: boolean;
  autocomplete?: boolean;
  */

const inputField = (element: Element) =>
  div(sx({ width: "240px", margin: "32px auto 32px auto" }), element);

const scheme = [
  h2("Scheme"),
  p("Primary"),
  inputField(
    numberInput({
      name: "number-input-scheme-primary",
      onChange: () => {},
      value: 42,
      scheme: "primary",
    })
  ),
  p("Secondary"),
  inputField(
    numberInput({
      name: "number-input-scheme-secondary",
      onChange: () => {},
      value: 42,
      scheme: "secondary",
    })
  ),
  p("Tertiary"),
  inputField(
    numberInput({
      name: "number-input-scheme-tertiary",
      onChange: () => {},
      value: 42,
      scheme: "tertiary",
    })
  ),
];

const size = [
  h2("Size"),
  p("Small"),
  inputField(
    numberInput({
      name: "number-input-size-sm",
      onChange: () => {},
      value: 42,
      size: "sm",
    })
  ),
  p("Middle"),
  inputField(
    numberInput({
      name: "number-input-size-md",
      onChange: () => {},
      value: 42,
      size: "md",
    })
  ),
  p("Large"),
  inputField(
    numberInput({
      name: "number-input-size-lg",
      onChange: () => {},
      value: 42,
      size: "lg",
    })
  ),
  p("Extra large"),
  inputField(
    numberInput({
      name: "number-input-size-xl",
      onChange: () => {},
      value: 42,
      size: "xl",
    })
  ),
];

const placeholder = [
  h2("Placeholder"),
  inputField(
    numberInput({
      name: "number-input-placeholder",
      onChange: () => {},
      placeholder: "Placeholder",
      value: undefined,
    })
  ),
];

const min = [
  h2("Min"),
  inputField(
    numberInput({
      name: "number-input-min",
      onChange: () => {},
      value: 42,
      min: 42,
    })
  ),
];

const max = [
  h2("Max"),
  inputField(
    numberInput({
      name: "number-input-max",
      onChange: () => {},
      value: 42,
      max: 42,
    })
  ),
];

const step = [
  h2("Step"),
  inputField(
    numberInput({
      name: "number-input-step",
      onChange: () => {},
      value: 42,
      step: 10,
    })
  ),
];

const hideArrows = [
  h2("Hide arrows"),
  p("Custom visible"),
  inputField(
    numberInput({
      name: "number-input-hide-arrows-visible",
      onChange: () => {},
      value: 42,
      hideArrows: false,
    })
  ),
  p("Default visible"),
  inputField(
    numberInput({
      name: "number-input-hide-arrows-default",
      onChange: () => {},
      value: 42,
      hideArrows: "default",
    })
  ),
  p("Hidden"),
  inputField(
    numberInput({
      name: "number-input-hide-arrows-hidden",
      onChange: () => {},
      value: 42,
      hideArrows: true,
    })
  ),
];

const navbarElement = div(undefined, []);

const contentElement = div(undefined, [
  h1("Number input"),
  p(loremIpsum),
  inputField(
    numberInput({ name: "number-input-base", onChange: () => {}, value: 42 })
  ),
  ...scheme,
  ...size,
  ...placeholder,
  ...min,
  ...max,
  ...step,
  ...hideArrows,
]);

defineBuiltinElement({
  tagName: "eofol-docs",
  render: () => {
    return container(
      [appbar(), layout(navbarElement, contentElement)],
      sx({ height: "100%" })
    );
  },
});
