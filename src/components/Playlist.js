import React, { useEffect } from "react";
import styles from "../styles/Playlist.module.css";
import Tracklist from "./Tracklist";

const Playlist = ({ playlist }) => {
  useEffect(() => {
    console.log("Playlist updated!");
  }, [playlist]);
  return (
    <div className={styles.container}>
      <h2>Results</h2>
      <Tracklist playlist={playlist} />
    </div>
  );
};

export default Playlist;
