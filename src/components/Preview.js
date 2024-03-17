import React, { useState, useEffect } from "react";
import styles from "../styles/Preview.module.css";
import play from "../img/play.png";
import pause from "../img/pause.png";

const Preview = ({ previewUri, image }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = React.createRef();

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} src={previewUri} />
      <button
        className={styles.btn}
        onClick={togglePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img className={styles.img} src={image} alt="#" />
        <img
          className={styles.img}
          style={{ opacity: isHovered ? 0.5 : 0 }}
          src={isPlaying ? pause : play}
          alt="#"
        />
      </button>
    </div>
  );
};

export default Preview;
