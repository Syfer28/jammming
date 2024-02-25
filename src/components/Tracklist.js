import styles from "../styles/Tracklist.module.css";
import Track from "./Track";

const Tracklist = ({
  playlist,
  filteredData,
  onAdd,
  isOnPlaylist,
  onRemove,
}) => {
  const data = filteredData || playlist;

  return (
    <ul className={styles.ul}>
      {data.map((track) => (
        <Track
          key={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
          onAdd={() => onAdd(track)}
          isOnPlaylist={isOnPlaylist}
          onRemove={() => onRemove(track)}
        />
      ))}
    </ul>
  );
};

export default Tracklist;
