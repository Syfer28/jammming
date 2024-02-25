import React from "react";
import styles from "../styles/Track.module.css";

const Track = ({ name, artist, album, onAdd, isOnPlaylist, onRemove }) => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <h1>{artist}</h1>
        <h3>
          {album} | {name}
        </h3>
      </div>
      {isOnPlaylist ? (
        <button className={styles.btn} type="button" onClick={onRemove}>
          -
        </button>
      ) : (
        <button className={styles.btn} type="button" onClick={onAdd}>
          +
        </button>
      )}
    </div>
  );
};

export default Track;
