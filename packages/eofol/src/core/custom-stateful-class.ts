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
  isBuiltin?: boolean
) {
  const extendsClass = isBuiltin ? HTMLDivElement : HTMLElement;

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
        if (isBuiltin) {
          this.root = this;
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
      const rendered = render(this.state, this.setState);

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
