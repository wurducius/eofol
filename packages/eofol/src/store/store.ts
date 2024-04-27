import { updateTarget } from "../core/render-target";
import { updateCustom } from "../core/custom-element";
import { customElementRegistry, targetElementRegistry } from "../core/registry";
import { mergeDeep } from "../util/util";
import { generateId } from "../util/crypto";

type StoreState = any;

type Store = {
  state: StoreState;
  projections: { name: string; projection: (state: StoreState) => any }[];
};

const storeRegistry: Record<string, Store> = {};

function createStore(name: string, initialState: StoreState) {
  if (storeRegistry[name]) {
    console.log(
      `Store "${name}" already registered. This is probably caused by a programming error.`
    );
  }

  storeRegistry[name] = { state: initialState, projections: [] };
}

function selector(name: string) {
  return storeRegistry[name]?.state;
}

function createProjection(
  name: string,
  projectionSource: string,
  projectionMap: (state: StoreState) => any
) {
  const initialState = selector(projectionSource);
  createStore(name, projectionMap(initialState));
  storeRegistry[projectionSource].projections.push({
    name,
    projection: projectionMap,
  });
}

function createSelector(
  projectionSource: string,
  projectionMap: (state: StoreState) => any
) {
  const name = `${projectionSource}-${generateId()}`;
  createProjection(name, projectionSource, projectionMap);
  return { name, selector: () => selector(name) };
}

function setStore(name: string, nextState: StoreState) {
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

    store.projections.forEach(({ name: projectionName, projection }) => {
      setStore(projectionName, projection(store.state));
    });
  } else {
    console.log(
      `Store "${name}" not registered. This is probably caused by a programming error.`
    );
  }
}

function mergeStore(name: string, nextState: StoreState) {
  const store = storeRegistry[name];

  if (store) {
    setStore(name, mergeDeep(store.state, nextState));
  } else {
    console.log(`Cannot access store "${name}". Check if the store exists.`);
  }
}

export default {
  createStore,
  selector,
  setStore,
  mergeStore,
  createProjection,
  createSelector,
};
