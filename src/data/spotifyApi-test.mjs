import SpotifyWebApi from "spotify-web-api-js";
var spotifyApi = new SpotifyWebApi("f3bd737e182d4ecf89971ceee2a71f9a");

spotifyApi.searchTracks("Love").then(
  function (data) {
    console.log('Search by "Love"', data);
  },
  function (err) {
    console.error(err);
  }
);
