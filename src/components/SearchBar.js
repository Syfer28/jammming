import { useState, useEffect } from "react";
import data from "../data/mock.json";
import styles from "../styles/SearchBar.module.css";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtering = data.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtering);
  });

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input
          className={styles.input}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        ></input>
        <button className={styles.button} type="submit">
          SEARCH
        </button>
        {filteredData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </form>
    </div>
  );
};

export default SearchBar;
