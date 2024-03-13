import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const Token = ({ getToken }) => {
  const CLIENT_ID = "f3bd737e182d4ecf89971ceee2a71f9a";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES =
    "playlist-modify-private user-library-read playlist-modify-public";

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
    getToken(accessToken);
    setToken(accessToken);
  }, [getToken]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    spotifyApi.setAccessToken("");
  };

  return (
    <div>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
        >
          Login to Spotify
        </a>
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" onClick={logout}>
          Logout
        </a>
      )}
    </div>
  );
};

export default Token;
