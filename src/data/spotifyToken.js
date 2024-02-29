import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const SpotifyToken = () => {
  const CLIENT_ID = "f3bd737e182d4ecf89971ceee2a71f9a";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [tracksList, setTracksList] = useState([]); // State for tracks list

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
    const url = "https://api.spotify.com/v1/search?q=3d&type=track";
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      // Assuming data.tracks.items is an array of track objects
      const tracks = data.tracks.items.map((item) => (
        <li key={item.id}>
          {item.name} - {item.artists[0].name}
          {/* Access other properties like album, duration, etc. */}
        </li>
      ));

      setTracksList(tracks); // Update state with track list elements
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
      {tracksList.length > 0 && <ul>{tracksList}</ul>}
    </div>
  );
};

export default SpotifyToken;
