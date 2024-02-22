import styles from "../styles/SearchResults.module.css";

const SearchResults = ({ filteredData }) => {
  return (
    <div className={styles.container}>
      {filteredData.length > 0 && (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
