import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="obourreal.au.auth0.com"
    clientId="cwCQs4mJCKJNCrPxXMLqNB4RYrS148Jw"
    audience="https://identity/api"
    scope="read:users"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
