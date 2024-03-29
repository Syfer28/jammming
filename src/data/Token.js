import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import styles from "../styles/Token.module.css";
// import spotlogo from "../img/spotlogo.png";

const spotifyApi = new SpotifyWebApi();

const Token = ({ getToken }) => {
  const CLIENT_ID = "f3bd737e182d4ecf89971ceee2a71f9a";
  const REDIRECT_URI = "http://localhost:3000/";
  // const REDIRECT_URI = "https://syfer28.github.io/jammming/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES =
    "playlist-modify-private user-library-read playlist-modify-public playlist-read-private";

  const [token, setToken] = useState("");

  const tokenExpiration = () => {
    setTimeout(() => {
      setToken("");
      getToken("");
      window.localStorage.removeItem("token");
      spotifyApi.setAccessToken("");
      window.location.reload(true);
    }, 3600 * 1000);
  };

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
      tokenExpiration();
    }
    getToken(accessToken);
    setToken(accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  const logout = (e) => {
    e.preventDefault();
    setToken("");
    window.localStorage.removeItem("token");
    spotifyApi.setAccessToken("");
    getToken("");
    window.location.reload(true);
  };

  return (
    <div className={styles.container}>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
          className={styles.btn}
        >
          {/* <img src={spotlogo} alt="Login" /> */}
          Login to Spotify
        </a>
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" onClick={logout} className={styles.btn}>
          {/* <img src={spotlogo} alt="Logout" /> */}
          Logout
        </a>
      )}
    </div>
  );
};

export default Token;
