import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Playlist from "../components/Playlist";
import styles from "./App.module.css";
import data from "../data/mock.json";

function App() {
  const [term, setTerm] = useState("");
  // const [filtTrecks, setFiltTrecks] = useState([]);
  // const [playlistName, setPlaylistName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const handleSearch = () => {
    const filtering = data.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtering);
  };

  const handleAdd = (track) => {
    if (!playlist.some((item) => item.id === track.id)) {
      setPlaylist((prevPlaylist) => [...prevPlaylist, track]);
    }
  };

  const handleRemove = (track) => {
    const updatedPlaylist = playlist.filter((item) => item.id !== track.id);
    setPlaylist(updatedPlaylist);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.app}>
        <SearchBar term={term} setTerm={setTerm} onClick={handleSearch} />
        <div className={styles.results}>
          <SearchResults filteredData={filteredData} onAdd={handleAdd} />
          <Playlist playlist={playlist} onRemove={handleRemove} />
        </div>
      </div>
    </div>
  );
}

export default App;
