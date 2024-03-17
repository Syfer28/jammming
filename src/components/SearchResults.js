import styles from "../styles/SearchResults.module.css";
import Tracklist from "./Tracklist";

const SearchResults = ({ filteredData, onAdd, previewUri }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Results: </h1>
      <Tracklist
        filteredData={filteredData}
        onAdd={onAdd}
        previewUri={previewUri}
      />
    </div>
  );
};

export default SearchResults;
