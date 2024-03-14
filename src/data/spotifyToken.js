import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import styles from "../styles/spotifyToken.module.css";
import Token from "./Token";

const spotifyApi = new SpotifyWebApi();

const SpotifyToken = ({
  term,
  searchTracks,
  playlistTerm,
  getPlaylist,
  onClearPlaylist,
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, token]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const data = await spotifyApi.getMe();
        setUserId(data.id);
        localStorage.setItem("userId", data.id);
      } catch (error) {
        console.log("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [token]);

  useEffect(() => {
    if (token && userId && playlistTerm && getPlaylist.length > 0) {
      const trackList = getPlaylist.map((itemId) => itemId.uri);

      const createPlaylist = async () => {
        try {
          const createdPlaylist = await spotifyApi.createPlaylist(userId, {
            name: playlistTerm,
            description: "My description",
            public: false,
          });

          await spotifyApi.addTracksToPlaylist(createdPlaylist.id, trackList);

          console.log("Playlist created successfully!");
          onClearPlaylist();
        } catch (error) {
          console.error("Error creating playlist:", error.message);
        }
      };

      createPlaylist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistTerm]);

  const handleTokenChange = (newToken) => {
    setToken(newToken);
    spotifyApi.setAccessToken(newToken);
  };

  return (
    <div className={styles.container}>
      <Token getToken={handleTokenChange} />
    </div>
  );
};

export default SpotifyToken;
