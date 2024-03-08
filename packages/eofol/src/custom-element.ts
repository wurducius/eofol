import { appendChild, arrayCombinator } from "./util";
import {
  EffectType,
  ElementNode,
  StateSetter,
  StateTypeImpl,
  StatefulArg,
  StatefulElement,
} from "./eofol-types";
import { MultiOptional } from "./common-types";
import { customElementRegistry } from "./registry";

function stateSetter<StateType>(
  customElementClass: StatefulElement<StateType>
) {
  return function (newState: StateType) {
    customElementClass.state = newState;
    customElementClass.renderUpdate();
  };
}

function defineCustomElement<StateType>({
  tagName,
  render,
  initialState,
  effect,
}: {
  tagName: string;
  render: StatefulArg<StateType, ElementNode>;
  initialState?: StateTypeImpl<StateType>;
  effect?: EffectType<StateType>;
}) {
  customElements.define(
    tagName,
    class CustomElement
      extends HTMLElement
      implements StatefulElement<StateType>
    {
      initialized: boolean;

      state: StateTypeImpl<StateType>;
      setState: StateSetter<StateTypeImpl<StateType>>;

      renderOffset: number;

      effect: EffectType<StateType>;
      effectCleanup: MultiOptional<StatefulArg<StateType, void>>;

      // @TODO
      static observedAttributes = [];

      constructor() {
        super();
        this.initialized = false;

        this.state = initialState ?? {};
        this.setState = stateSetter<StateTypeImpl<StateType>>(this);

        this.renderOffset = 0;

        this.effect = effect;
      }

      connectedCallback() {
        if (!this.initialized) {
          this.initialized = true;
          this.attachShadow({ mode: "open" });
          if (this.shadowRoot) {
            customElementRegistry.push(this.shadowRoot);
          }
          this.injectStyles();
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

        if (this.shadowRoot) {
          arrayCombinator(appendChild(this.shadowRoot), rendered);
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
        if (this.shadowRoot) {
          const nodesToRemove = [];
          for (
            let c = 0 + this.renderOffset;
            c < this.shadowRoot.childNodes.length;
            c++
          ) {
            nodesToRemove.push(this.shadowRoot.childNodes.item(c));
          }
          nodesToRemove.forEach((child) => {
            if (this.shadowRoot) {
              this.shadowRoot.removeChild(child);
            }
          });
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
    }
  );
}

module.exports = defineCustomElement;
