import React from "react";
import ReactDOM from "react-dom";
import ThreeScene from "./ThreeScene";

import "./styles.css";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ThreeScene />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
