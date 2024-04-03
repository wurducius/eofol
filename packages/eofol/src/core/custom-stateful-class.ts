import {
  StatefulElement,
  ControlledCustomElement,
  StateTypeImpl,
  StateSetter,
  EffectType,
  MultiOptional,
  StatefulArg,
  RenderType,
} from "@eofol/eofol-types";
import { generateId } from "../util/crypto";
import { appendChild, removeChildren } from "../util/dom";
import { arrayCombinator } from "../util/util";
import { customElementRegistry } from "./registry";

function getHTMLElementClass(tagName: string | undefined) {
  if (!tagName) {
    return HTMLElement;
  }
  if (tagName === "div") {
    return HTMLDivElement;
  }
  if (tagName === "a") {
    return HTMLLinkElement;
  }
  if (tagName === "button") {
    return HTMLButtonElement;
  }
  if (tagName === "input") {
    return HTMLInputElement;
  }
  if (tagName === "span") {
    return HTMLSpanElement;
  }
  if (tagName === "p") {
    return HTMLParagraphElement;
  }
  if (
    tagName === "h1" ||
    tagName === "h2" ||
    tagName === "h3" ||
    tagName === "h4" ||
    tagName === "h5"
  ) {
    return HTMLHeadingElement;
  }

  return HTMLElement;
}

function attributesToObject(namedNodeMap: NamedNodeMap) {
  const attributes: any = {};
  for (let i = 0; i < namedNodeMap.length; i++) {
    const item = namedNodeMap.item(i);
    if (item) {
      attributes[item.name] = item.value;
    }
  }
  return attributes;
}

function stateSetter<StateType>(
  customElementClass: StatefulElement<StateType>
) {
  return function (newState: StateType) {
    customElementClass.state = newState;
    customElementClass.renderUpdate();
  };
}

export function customStatefulClass<StateType>(
  {
    render,
    initialState,
    effect,
    subscribe,
  }: {
    render: RenderType<StateType>;
    initialState?: StateTypeImpl<StateType>;
    effect?: EffectType<StateType>;
    subscribe?: string[];
  },
  extendsTag?: string
) {
  const extendsClass = getHTMLElementClass(extendsTag);

  return class CustomElement
    extends extendsClass
    implements StatefulElement<StateType>, ControlledCustomElement<StateType>
  {
    initialized: boolean;

    root: Element | ShadowRoot | null;

    state: StateTypeImpl<StateType>;
    setState: StateSetter<StateTypeImpl<StateType>>;

    renderOffset: number;

    effect: EffectType<StateType>;
    effectCleanup: MultiOptional<StatefulArg<StateType, void>>;

    subscribe: string[] | undefined;

    // @TODO
    static observedAttributes = [];

    constructor() {
      super();
      this.initialized = false;

      this.state = initialState ?? {};
      this.setState = stateSetter<StateTypeImpl<StateType>>(this);

      this.renderOffset = 0;

      this.root = null;

      this.effect = effect;

      this.subscribe = subscribe;
    }

    connectedCallback() {
      if (!this.initialized) {
        this.initialized = true;
        if (extendsClass) {
          this.root = this;
          // this._internals = this.attachInternals();
        } else {
          this.attachShadow({ mode: "open" });
          if (this.shadowRoot) {
            this.root = this.shadowRoot;
            const id = this.getAttribute("id") ?? generateId();
            customElementRegistry[id] = this;
          }
          this.injectStyles();
        }
        this.render();
        this.afterRender();
      }
    }

    renderUpdate() {
      this.cleanup();
      this.removeChildren();
      this.render();
      this.afterRender();
    }

    render() {
      const rendered = render(
        this.state,
        this.setState,
        attributesToObject(this.attributes)
      );

      if (this.root) {
        arrayCombinator(appendChild(this.root), rendered);
      }
    }

    disconnectedCallback() {
      this.cleanup();
    }

    // adoptedCallback() {}

    afterRender() {
      if (this.effect) {
        if (Array.isArray(this.effect)) {
          // @TODO ??? reduce this.state
          this.effectCleanup = [];
          this.effect.forEach((effect, i) => {
            const effectResult = effect(this.state, this.setState);
            if (effectResult && Array.isArray(this.effectCleanup)) {
              this.effectCleanup[i] = effectResult;
            }
          });
        } else {
          const effectResult = this.effect(this.state, this.setState);
          if (effectResult) {
            this.effectCleanup = effectResult;
          }
        }
      }
    }

    cleanup() {
      if (this.effectCleanup) {
        if (Array.isArray(this.effectCleanup)) {
          this.effectCleanup.forEach((cleanup) => {
            if (cleanup) {
              cleanup(this.state, this.setState);
            }
          });
        } else {
          this.effectCleanup(this.state, this.setState);
        }
        this.effectCleanup = undefined;
      }
    }

    // @TODO
    attributeChangedCallback(name: string, prev: any, next: any) {
      console.log(`Attribute ${name} changed ${prev} -> ${next}`);
    }

    removeChildren() {
      if (this.root) {
        removeChildren(this.root, this.renderOffset);
      }
    }

    injectStyles() {
      if (this.shadowRoot) {
        const stylesheet = document.createElement("link");
        stylesheet.setAttribute("rel", "stylesheet");
        stylesheet.setAttribute("href", "assets/css/index.css");
        this.shadowRoot.appendChild(stylesheet);
        this.renderOffset += 1;

        const styles = document.createElement("style");
        this.shadowRoot.appendChild(styles);
        this.renderOffset += 1;
      }
    }

    getShadowRoot() {
      return this.root;
    }
  };
}
