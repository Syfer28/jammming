import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import styles from "../styles/spotifyToken.module.css";

const spotifyApi = new SpotifyWebApi();

const SpotifyToken = ({ term, searchTracks, playlistTerm }) => {
  const CLIENT_ID = "f3bd737e182d4ecf89971ceee2a71f9a";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = "playlist-modify-private user-library-read";

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

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

  useEffect(() => {
    const fetchTracks = async () => {
      if (!term || !token) return;

      const url = `https://api.spotify.com/v1/search?q=${term}&type=track`;
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        searchTracks(data.tracks.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTracks();
  }, [term, token]);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!token) return; // Skip if no token

      const url = "https://api.spotify.com/v1/me";
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setUserId(data.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserId();
  }, [token]);

  useEffect(() => {
    const createPlaylist = async () => {
      const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
      const playlistBody = {
        name: playlistTerm || "New playlist",
        description: "desc",
        public: false,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(playlistBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message);
        }

        console.log("Created");
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    createPlaylist();
  }, [playlistTerm]);

  return (
    <div className={styles.container}>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button className={styles.btn} onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default SpotifyToken;
