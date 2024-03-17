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
  trackId,
  getPreviewUri,
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
    const fetchTracks = async () => {
      try {
        if (!trackId) {
          return;
        }
        const trackPromises = trackId.map(async (id) => {
          try {
            const data = await spotifyApi.getTrack(id);
            return data.preview_url;
          } catch (error) {
            console.log("Error fetching track:", error);
          }
        });

        const trackData = await Promise.all(trackPromises);
        getPreviewUri(trackData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTracks();
  }, [token, trackId]);

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
    if (token && userId && playlistTerm && getPlaylist) {
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
