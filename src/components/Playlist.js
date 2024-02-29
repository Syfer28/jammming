import React, { useState } from "react";
import styles from "../styles/Playlist.module.css";
import Tracklist from "./Tracklist";
import SpofiyToken from "../data/spotifyToken";

const Playlist = ({ playlist, onRemove }) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container} style={{ color: "white" }}>
      <form onClick={handleSubmit}>
        <input
          className={styles.input}
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Enter playlist name!"
        />
        <Tracklist
          playlist={playlist}
          isOnPlaylist={true}
          onRemove={onRemove}
        />
        <button type="submit">SAVE TO SPOTIFY</button>
      </form>
      <SpofiyToken />
    </div>
  );
};

export default Playlist;
