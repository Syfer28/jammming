import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import styles from "../styles/spotifyToken.module.css";
import Token from "./Token";
import Playlist from "../components/Playlist";

const spotifyApi = new SpotifyWebApi();

const SpotifyToken = ({ term, searchTracks, playlistTerm, getPlaylist }) => {
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
    spotifyApi.getAccessToken(token);
    const fetchUserId = async () => {
      spotifyApi.getMe().then(
        function (data) {
          setUserId(data.id);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    };

    fetchUserId();
  }, [token]);

  useEffect(() => {
    spotifyApi.getAccessToken(token);
    const trackList = getPlaylist.map((itemId) => itemId.uri);
    const createPlaylist = async () => {
      try {
        const createdPlaylist = await spotifyApi.createPlaylist(userId, {
          name: playlistTerm,
          description: "My description",
          public: false,
        });
        spotifyApi.addTracksToPlaylist(createdPlaylist.id, [...trackList]).then(
          function (data) {
            console.log("Added tracks to playlist!");
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
      } catch (error) {
        console.error(error.message);
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
