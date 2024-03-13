import { updateTarget } from "../core/render-target";
import { customElementRegistry, targetElementRegistry } from "../core/registry";
import { updateCustom } from "../..";
import { merge } from "../util/util";

type StoreState = any;

type Store = { state: StoreState };

const storeRegistry: Record<string, Store> = {};

export function createStore(name: string, initialState: StoreState) {
  if (storeRegistry[name]) {
    console.log(
      `Store "${name}" already registered. This is probably caused by a programming error.`
    );
  }

  storeRegistry[name] = { state: initialState };
}

export function select(name: string) {
  return storeRegistry[name]?.state;
}

export function setStore(name: string, nextState: StoreState) {
  const store = storeRegistry[name];

  if (store) {
    store.state = nextState;

    Object.keys(targetElementRegistry).forEach((id) => {
      const element = targetElementRegistry[id];
      if (element.subscribe && element.subscribe.includes(name)) {
        updateTarget(id);
      }
    });

    Object.keys(customElementRegistry).forEach((id) => {
      const element = customElementRegistry[id];
      if (element.subscribe && element.subscribe.includes(name)) {
        updateCustom(id);
      }
    });
  } else {
    console.log(
      `Store "${name}" not registered. This is probably caused by a programming error.`
    );
  }
}

export function mergeStore(name: string, nextState: StoreState) {
  const store = storeRegistry[name];

  if (store) {
    setStore(name, merge(store.state, nextState));
  } else {
    console.log(`Cannot access store "${name}". Check if the store exists.`);
  }
}
