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
  const [clearMessage, setClearMessage] = useState("");
  const [trackId, setTrackId] = useState("");

  const handleSearch = (searchTerm) => {
    setTerm(searchTerm);
  };

  const handleChange = (playlistTerm) => {
    setPlaylistName(playlistTerm);
  };

  const handleFilter = (tracks) => {
    setFilteredData(tracks);
    setTrackId(tracks.map((track) => track.id));
  };

  const handleAdd = (track) => {
    if (!playlist.some((item) => item.id === track.id)) {
      setPlaylist((prevPlaylist) => [...prevPlaylist, track]);
      setClearMessage("");
    }
  };

  const handleRemove = (track) => {
    const updatedPlaylist = playlist.filter((item) => item.id !== track.id);
    setPlaylist(updatedPlaylist);
  };

  const handlePlaylistClear = () => {
    setPlaylist([]);
    setClearMessage("Playlist created succesfully");
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
          trackId={trackId}
        />
        <SearchBar onSearch={handleSearch} />
        <div className={styles.results}>
          <SearchResults filteredData={filteredData} onAdd={handleAdd} />
          <Playlist
            playlist={playlist}
            onRemove={handleRemove}
            onNameChange={handleChange}
            clearMessage={clearMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
