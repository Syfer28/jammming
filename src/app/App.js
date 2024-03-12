import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Playlist from "../components/Playlist";
import SpotifyToken from "../data/spotifyToken";
import styles from "./App.module.css";

function App() {
  const [term, setTerm] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const handleSearch = (searchTerm) => {
    setTerm(searchTerm);
  };

  const handleChange = (playlistTerm) => {
    setPlaylistName(playlistTerm);
  };

  const handleFilter = (tracks) => {
    setFilteredData(tracks);
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

  const handlePlaylistClear = () => {
    setPlaylist([]);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.app}>
        <SpotifyToken
          term={term}
          searchTracks={handleFilter}
          playlistTerm={playlistName}
          getPlaylist={playlist}
          onClearPlaylist={handlePlaylistClear}
        />
        <SearchBar onSearch={handleSearch} />
        <div className={styles.results}>
          <SearchResults filteredData={filteredData} onAdd={handleAdd} />
          <Playlist
            playlist={playlist}
            onRemove={handleRemove}
            onNameChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
