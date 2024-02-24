import styles from "../styles/Tracklist.module.css";
import Track from "./Track";

const Tracklist = ({ filteredData }) => {
  return (
    <ul className={styles.ul}>
      {filteredData &&
        filteredData.map((track) => (
          <Track
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
          />
        ))}
    </ul>
  );
};

export default Tracklist;
