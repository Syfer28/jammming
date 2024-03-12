import React, { useState } from "react";
import styles from "../styles/Playlist.module.css";
import Tracklist from "./Tracklist";

const Playlist = ({ playlist, onRemove, onNameChange }) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNameChange(playlistName);
  };

  return (
    <div className={styles.container} style={{ color: "white" }}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Enter search term"
        />
        <button type="submit">SAVE TO SPOTIFY</button>
        <Tracklist
          playlist={playlist}
          isOnPlaylist={true}
          onRemove={onRemove}
        />
      </form>
    </div>
  );
};

export default Playlist;
