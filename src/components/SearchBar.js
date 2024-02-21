import styles from "../styles/SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input className={styles.input}></input>
        <button className={styles.button} type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
