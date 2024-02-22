import styles from "../styles/SearchBar.module.css";

const SearchBar = ({ onClick, term, setTerm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
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
