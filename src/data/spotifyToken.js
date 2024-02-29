import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function SpotifyToken() {
  const CLIENT_ID = "f3bd737e182d4ecf89971ceee2a71f9a";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let accessToken = window.localStorage.getItem("token");

    if (!accessToken && hash) {
      accessToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", accessToken);

      spotifyApi.setAccessToken(accessToken);
    }

    setToken(accessToken);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    spotifyApi.setAccessToken("");
  };

  const fetchTracks = async () => {
    if (!token) return;
    const url = "https://api.spotify.com/v1/search?q=3d&type=track";

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      {token && <button onClick={fetchTracks}>Fetch Tracks</button>}
    </div>
  );
}

export default SpotifyToken;
