import React, { useEffect } from "react";

import { applyMiddlewareToChain } from "../hooks/reduxHook";

import useBananaRedux from "../redux/BananaReducer";

export default function BananaDisplayComponent() {
  let [state] = useBananaRedux();

  /*    if too much banana add async loaded middleware
        to console.log the number of bananas
        because why not if it's possible?   */
  const shouldHaveBananaMiddleware = state.banana > 5;

  useEffect(
    () => {
      if (shouldHaveBananaMiddleware) {
        import("../redux/BananaMiddleware").then(m => {
          applyMiddlewareToChain(m.default);
        });
      }
    },
    [shouldHaveBananaMiddleware]
  );

  return <p>{`Banana: ${state.banana}`}</p>;
}
