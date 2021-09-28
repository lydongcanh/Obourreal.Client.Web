/* global google */
import { useState, useEffect } from "react";
import logo from "./AnsaradaLogomark.png";
import "./App.css";
import jwtDecoder from "jwt-decode";
import ReactJson from "react-json-view";
import auth0 from "auth0-js";
import axios from "axios";

declare var google: any;

function App() {
  const [haveGoogleData, sethaveGoogleData] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({ credential: "" });
  const [decodedResponse, setDecodedResponse] = useState({
    email: "",
    picture: "",
    name: "",
    given_name: "",
    family_name: ""
  });

  const webAuth = new auth0.WebAuth({
    domain: "obourreal.au.auth0.com",
    clientID: "cwCQs4mJCKJNCrPxXMLqNB4RYrS148Jw"
  });

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "764685268204-v5ues1pr7va8hui1enkpqbbr01fh1pt5.apps.googleusercontent.com",
      callback: onOnSignedIn
    });
    google.accounts.id.prompt((notification: any) => {
      console.log(notification);
    });
  }, []);

  function onOnSignedIn(response: any): void {
    sethaveGoogleData(true);
    setResponse(response);
    setDecodedResponse(jwtDecoder(response.credential));
  }

  function signUp() {
    if (isSignedUp)
      return;

    setIsSignedUp(true);
    webAuth.signup({
      connection: "Username-Password-Authentication",
      email: decodedResponse.email,
      password: password,
      userMetadata: { 
        picture: decodedResponse.picture,
        name: decodedResponse.name,
        given_name: decodedResponse.given_name,
        family_name: decodedResponse.family_name
      }    
    }, (error) => {
      if (!error)
        return;

      setIsSignedUp(false);
      console.error(error);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {haveGoogleData &&
          <div>
            <ReactJson
              name="Response"
              src={response}
              enableClipboard={false}
              displayDataTypes={false}
              collapseStringsAfterLength={100}
            />
            <br />
            <ReactJson
              name="Decoded credential"
              src={decodedResponse}
              enableClipboard={false}
              displayDataTypes={false}
            />
            <br />
            <input 
              type="password" 
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              disabled={isSignedUp}
              onClick={signUp}
              className="Authorize-button"
            >
                Sign up
            </button>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
