import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import styles from "../styles/spotifyToken.module.css";
import Token from "./Token";

const spotifyApi = new SpotifyWebApi();

const SpotifyToken = ({ term, searchTracks, playlistTerm }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const header = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchTracks = async () => {
      if (!term || !token) return;

      const url = `https://api.spotify.com/v1/search?q=${term}&type=track`;
      try {
        const response = await fetch(url, {
          headers: header,
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
          headers: header,
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
        name: playlistTerm,
        description: "desc",
        public: false,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: header,
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

  const handleTokenChange = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className={styles.container}>
      <Token getToken={handleTokenChange} />
    </div>
  );
};

export default SpotifyToken;
