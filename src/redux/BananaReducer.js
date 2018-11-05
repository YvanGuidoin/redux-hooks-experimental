import { addReducer } from "../hooks/reduxHook";
import { actions } from "./BananaActions";

function bananaReducer(state = { banana: 0 }, action) {
  switch (action.type) {
    case actions.ADD_BANANA:
      return {
        ...state,
        banana: state.banana + 1
      };
    default:
      return state;
  }
}

const bananaNamespaceRedux = "elvis";
export { bananaNamespaceRedux };

export default addReducer(bananaNamespaceRedux, bananaReducer);
