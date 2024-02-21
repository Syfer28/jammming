import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Playlist from "../components/Playlist";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.app}>
        <SearchBar />
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
