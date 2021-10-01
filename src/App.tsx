import { useState, useEffect } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import auth0 from "auth0-js";

function App() {

	return (
		<div className="App">
			<LoginButton />
		</div>
	);
}

export default App;
