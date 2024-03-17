import React, { useState, useEffect } from "react";
import styles from "../styles/Playlist.module.css";
import Tracklist from "./Tracklist";

const Playlist = ({
  playlist,
  onRemove,
  onNameChange,
  clearMessage,
  previewUri,
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const [submittedEmpty, setSubmittedEmpty] = useState(false);

  useEffect(() => {
    if (submittedEmpty) {
      const inputElement = document.querySelector(`.${styles.input}`);
      inputElement.classList.add(styles.shake);

      setTimeout(() => {
        inputElement.classList.remove(styles.shake);
      }, 500);
    }
  }, [submittedEmpty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playlistName.trim() === "") {
      setSubmittedEmpty(true);
    } else {
      onNameChange(playlistName);
      setTimeout(() => {
        setPlaylistName("");
      }, 500);
      setSubmittedEmpty(false);
    }
  };

  return (
    <div className={styles.container} style={{ color: "white" }}>
      <form onSubmit={handleSubmit}>
        <input
          className={`${styles.input} ${submittedEmpty ? styles.empty : ""}`}
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
          previewUri={previewUri}
        />
      </form>
    </div>
  );
};

export default Playlist;
