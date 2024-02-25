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
  const [playlist, setPlaylist] = useState([]);

  const handleSearch = () => {
    const filtering = data.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    console.log("Filtered Data:", filtering);
    setFilteredData(filtering);
  };

  const handleAdd = (track) => {
    // Check if the track is already in the playlist
    if (!playlist.some((item) => item.id === track.id)) {
      // If not, add the track to the playlist
      console.log("Adding to Playlist:", track);
      console.log("Playlist now: ", playlist);
      setPlaylist((prevPlaylist) => [...prevPlaylist, track]);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.app}>
        <SearchBar term={term} setTerm={setTerm} onClick={handleSearch} />
        <div className={styles.results}>
          <SearchResults filteredData={filteredData} onAdd={handleAdd} />
          <Playlist playlist={playlist} />
        </div>
      </div>
    </div>
  );
}

export default App;
