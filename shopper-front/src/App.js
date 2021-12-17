import React from "react";
import GlobalStatesContext from "./global/GlobalStatesContext";
import Router from "./routers/Router"

function App() {
  return (
    <GlobalStatesContext >
      <Router />
    </GlobalStatesContext>
  );
}

export default App;
