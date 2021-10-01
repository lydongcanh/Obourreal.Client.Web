import { useState } from "react";
import "./App.css";
import { LoginButton, LogoutButton, UserProfile } from "./components";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { isAuthenticated } = useAuth0();

	return (
		<div className="App">
			<div className="App-header">
				{
					isAuthenticated 
						? (
							<div>
								<UserProfile />
								<LogoutButton />
							</div>
						)
						: <LoginButton />
				}
				
			</div>
		</div>
	);
}

export default App;
