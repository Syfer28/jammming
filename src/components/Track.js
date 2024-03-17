import React from "react";
import styles from "../styles/Track.module.css";
import Preview from "./Preview";

const Track = ({
  name,
  artist,
  album,
  image,
  onAdd,
  isOnPlaylist,
  onRemove,
  previewUri,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.bodyImage}>
          <Preview previewUri={previewUri} image={image} />
        </div>
        <div className={styles.bodyText}>
          <p className={styles.name}>{name}</p>
          <div className={styles.lilBody}>
            <p className={styles.artist}>{artist}</p>
            <p className={styles.album}>{album}</p>
          </div>
        </div>
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
