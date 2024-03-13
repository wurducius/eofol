import { updateTarget } from "../core/render-target";
import { customElementRegistry, targetElementRegistry } from "../core/registry";
import { updateCustom } from "../..";

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

export function selectStore(name: string) {
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
  const prevState = selectStore(name);

  if (prevState) {
    setStore(name, { ...prevState, nextState });
  } else {
    console.log(
      `Cannot access store ${name} state. Check if the store exists and if its state doesn't equal undefined.`
    );
  }
}
