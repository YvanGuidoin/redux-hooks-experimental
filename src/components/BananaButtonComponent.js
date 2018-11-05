import React from "react";

import useBananaRedux from "../redux/BananaReducer";
import { addBanana } from "../redux/BananaActions";

const buttonStyle = {
  border: "none",
  borderRadius: "5",
  padding: 5,
  background: "white",
  color: "black",
  fontFamily: "inherit",
  fontStyle: "italic",
  fontSize: "inherit"
};
export default function BananaButtonComponent() {
  let [, dispatch] = useBananaRedux();

  function handleAddBanana() {
    dispatch(addBanana());
  }

  return (
    <p>
      <button style={buttonStyle} onClick={handleAddBanana}>
        Add a banana
      </button>
    </p>
  );
}
