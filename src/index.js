import { StrictMode } from "react";
import ReactDOM from "react-dom";
// trying it addung
import App from "./abstract/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
