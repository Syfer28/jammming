import React from "react";
import styles from "../styles/Playlist.module.css";
import Tracklist from "./Tracklist";

const Playlist = ({ playlist, onRemove }) => {
  return (
    <div className={styles.container}>
      <h2>Results</h2>
      <Tracklist playlist={playlist} isOnPlaylist={true} onRemove={onRemove} />
    </div>
  );
};

export default Playlist;
