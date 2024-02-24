import styles from "../styles/Playlist.module.css";
import Tracklist from "./Tracklist";

const Playlist = () => {
  return (
    <div className={styles.container}>
      <h2>Results</h2>
      <Tracklist />
    </div>
  );
};

export default Playlist;
