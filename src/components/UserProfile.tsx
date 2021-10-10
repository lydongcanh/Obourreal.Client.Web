import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserProfile = () => {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [appMetadata, seAppMetadata] = useState(null);
  const [identityAccessToken, setIdentityAccessToken] = useState("");
  const [managementAccessToken, setManagementAccessToken] = useState("");

  useEffect(() => {
    const getIdentityAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://identity.obourreal.com/api",
          scope: "read:users",
        });

        setIdentityAccessToken(accessToken);
      } catch (e) {
        console.error(e);
      }
    };

    getIdentityAccessToken();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const getManagementAccessToken = async () => {
      if (!user)
        return;

      const domain = "obourreal.au.auth0.com";
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await axios.get(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { user_metadata, app_metadata } = await metadataResponse.data;
        setUserMetadata(user_metadata);
        seAppMetadata(app_metadata);
        setManagementAccessToken(accessToken);
      } catch (e) {
        console.error(e);
      }
    };

    getManagementAccessToken();
  }, [getAccessTokenSilently, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Unauthenticated...</div>;
  }

  if (!user) {
    return <div>Empty user...</div>;
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      <h3>App Metadata</h3>
        {appMetadata ? (
          <pre>{JSON.stringify(appMetadata, null, 2)}</pre>
        ) : (
          "No app metadata defined"
        )}

      <br /><br />
      <button onClick={async () => {
        const response = await axios.get("https://localhost:5001/api/test/claims", {
          headers: {
            'Authorization': `Bearer ${identityAccessToken}`
          }
        });
        console.log(response.data);
      }}>Identity API Claims</button>
   
      <br /><br />
      <button onClick={async () => {
        const response = await axios.get("https://localhost:5001/api/test/claims", {
          headers: {
            'Authorization': `Bearer ${managementAccessToken}`
          }
        });
        console.log(response.data);
      }}>Management API Claims</button>

      <br /><br />
      <button onClick={async () => {
        const response = await axios.get("https://localhost:5001/api/test/private-scoped", {
          headers: {
            'Authorization': `Bearer ${identityAccessToken}`
          }
        });
        console.log(response.data);
      }}>Private</button>
    </div>
  );
}

export default UserProfile;