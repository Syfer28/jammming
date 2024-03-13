import styles from "../styles/SearchResults.module.css";
import Tracklist from "./Tracklist";

const SearchResults = ({ filteredData, onAdd }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Rets: </h1>
      <Tracklist filteredData={filteredData} onAdd={onAdd} />
    </div>
  );
};

export default SearchResults;
