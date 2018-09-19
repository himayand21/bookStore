import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

import BookStore from "./components/bookStore";

ReactDOM.render(<BookStore />, document.getElementById("root"));
registerServiceWorker();
