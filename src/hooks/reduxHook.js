import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { useEffect, useState } from "react";

import dynamicMiddlewares, { addMiddleware } from "./dynamicMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = {};

let store = createStore(
  state => state,
  composeEnhancers(applyMiddleware(dynamicMiddlewares))
);

/**
 * Replace only the reducers in the store
 */
function recreateReducers() {
  store.replaceReducer(combineReducers(reducers));
}

/**
 * Add a reducer to the store
 * @param {string} namespace
 * @param {redux.Reducer} reducer
 */
export function addReducer(namespace, reducer) {
  if (!store[namespace] || (store[namespace] && store[namespace] !== reducer)) {
    reducers[namespace] = reducer;
    recreateReducers();
  }
  return () => useReduxSubscriptionToNamespace(namespace);
}

/**
 *
 * @param {redux.Store} state
 * @param {string} namespace
 */
function selectState(state, namespace) {
  return state[namespace];
}

/**
 * create a state for storing redux value + subscribe to changes
 * @param {string} namespace
 */
function useReduxSubscriptionToNamespace(namespace) {
  if (!reducers[namespace])
    throw new Error(`No reducer on namespace: ${namespace}`);

  function dispatch(action) {
    store.dispatch(action);
  }

  const [state, setState] = useState(store.getState()[namespace]);

  function handleChange() {
    const newState = store.getState();
    const newStateSubPart = selectState(newState, namespace);
    if (newStateSubPart !== state) {
      setState(newStateSubPart);
    }
  }

  useEffect(
    () => {
      const unsubscribe = store.subscribe(handleChange);
      return unsubscribe;
    },
    [namespace]
  );

  return [state, dispatch];
}

export function applyMiddlewareToChain(middleware) {
  addMiddleware(middleware);
}
