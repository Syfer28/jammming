import React, { useState } from "react";
import styles from "../styles/Playlist.module.css";
import Tracklist from "./Tracklist";

const Playlist = ({ playlist, onRemove, onNameChange, clearMessage }) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNameChange(playlistName);
    setTimeout(() => {
      setPlaylistName("");
    }, 500);
  };

  return (
    <div className={styles.container} style={{ color: "white" }}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Enter playlist name"
        />
        <button className={styles.btn} type="submit">
          SAVE TO SPOTIFY
        </button>
        <p className={styles.clearMessage}>{clearMessage}</p>
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
