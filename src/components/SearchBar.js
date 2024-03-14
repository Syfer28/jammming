import { useState, useEffect } from "react";
import styles from "../styles/SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");
  const [submittedEmpty, setSubmittedEmpty] = useState(false);

  useEffect(() => {
    if (submittedEmpty) {
      const inputElement = document.querySelector(`.${styles.input}`);
      inputElement.classList.add(styles.shake);

      setTimeout(() => {
        inputElement.classList.remove(styles.shake);
      }, 500);
    }
  }, [submittedEmpty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim() === "") {
      setSubmittedEmpty(true);
    } else {
      onSearch(term);
      setSubmittedEmpty(false);
    }
    onSearch(term);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={`${styles.input} ${submittedEmpty ? styles.empty : ""}`}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button className={styles.button} type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
