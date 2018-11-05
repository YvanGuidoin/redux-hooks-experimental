import React from "react";
import "./App.css";

import BananaComponent from "./components/BananaComponent";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Redux test with hooks</p>
          <BananaComponent />
        </header>
      </div>
    );
  }
}

export default App;
