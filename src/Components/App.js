import React, { Component } from "react";
import GlobalStyles from "./GlobalStyles";
import Router from "./Router";

class App extends Component {
  render() {
    return (
      <>
        <Router />
        <GlobalStyles />
      </>
    );
  }
}

export default App;
