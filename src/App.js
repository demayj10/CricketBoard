import React, { Component } from "react";
import GlobalProvider from "./lib/GlobalProvider";

import Board from "./component/Board/index";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <GlobalProvider>
          <Board />
        </GlobalProvider>
      </div>
    );
  }
}
