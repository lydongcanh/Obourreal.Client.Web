import "./App.css";
import { LoginButton, LogoutButton, UserProfile } from "./components";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

	const { isAuthenticated } = useAuth0();

	return (
		<div className="App">
			<div className="App-header">
				<img style={{ maxWidth: 250 }} src={process.env.PUBLIC_URL + 'logo.svg'} alt="Obourreal logo" />
				<br />
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
