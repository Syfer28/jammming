import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Playlist from "../components/Playlist";
import styles from "./App.module.css";
import data from "../data/mock.json";

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    const filtering = data.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    console.log("Filtered Data:", filtering);
    setFilteredData(filtering);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.app}>
        <SearchBar term={term} setTerm={setTerm} onClick={handleSearch} />
        <div className={styles.results}>
          <SearchResults filteredData={filteredData} />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
