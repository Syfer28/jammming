import styles from "../styles/Tracklist.module.css";
import Track from "./Track";

const Tracklist = ({
  playlist,
  filteredData,
  onAdd,
  isOnPlaylist,
  onRemove,
  previewUri,
}) => {
  const data = filteredData || playlist;

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        {data.map((track, index) => (
          <Track
            key={track.id}
            previewUri={
              previewUri && previewUri[index] ? previewUri[index] : ""
            }
            name={track.name}
            artist={track.artists[0].name}
            album={track.album.name}
            image={track.album.images[0].url}
            onAdd={() => onAdd(track)}
            isOnPlaylist={isOnPlaylist}
            onRemove={() => onRemove(track)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tracklist;
