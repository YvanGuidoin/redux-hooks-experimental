const actions = {
  ADD_BANANA: "ADD_BANANA"
};
export { actions };

export function addBanana() {
  return {
    type: actions.ADD_BANANA
  };
}
