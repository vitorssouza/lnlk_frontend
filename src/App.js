import React from "react";
import { BrowserRouter } from "react-router-dom";

// App Routes
import Routes from "./routes";

// Stylesheets
import "./styles/css/index.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Http Interceptor
import "./http.interceptor";

function App() {
  /* global PUBLIC_URL */
  const basename =
    process.env.NODE_ENV === "development" ? "/" : PUBLIC_URL || "/";

  return (
    <BrowserRouter basename={basename}>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
