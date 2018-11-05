import { actions } from "./BananaActions";
import { bananaNamespaceRedux } from "./BananaReducer";

function grabBananaCount(store) {
  const {
    [bananaNamespaceRedux]: { banana }
  } = store.getState() || { [bananaNamespaceRedux]: { banana: NaN } };
  return banana;
}

const bananaMiddleware = store => next => action => {
  switch (action.type) {
    case actions.ADD_BANANA:
      let banana = grabBananaCount(store);
      console.log(`Banana before reducer: ${banana}`);
      const afterState = next(action);
      banana = grabBananaCount(store);
      console.log(`Banana after reducer: ${banana}`);
      return afterState;
    default:
      return next(action);
  }
};

export default bananaMiddleware;
