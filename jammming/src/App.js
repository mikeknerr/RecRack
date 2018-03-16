import React, { Component } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar.js';
import { SearchResults } from './components/SearchResults/SearchResults.js';
import { Playlist } from './components/Playlist/Playlist.js';
import Spotify from './util/Spotify.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {tracks: [], playlist: [], playlistName: 'New Playlist'};
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.setPlaylistName = this.setPlaylistName.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term).then(tracks => {
      this.setState({tracks: tracks});

    })
  }

  addTrack(track) {
    let newPlaylist = this.state.playlist;
    newPlaylist.push(track);
    this.setState({playlist: newPlaylist});

  }

  removeTrack(track) {
    let oldPlaylist = this.state.playlist;
    let newPlaylist = oldPlaylist.filter(x => x.id !== track.id);
    this.setState({playlist: newPlaylist});

  }

  savePlaylist(playlistName, tracks) {
    Spotify.createPlaylist(playlistName, tracks).then(
      this.setState({playlist: [], playlistName: 'New Playlist'})
    );
  }

  setPlaylistName(name) {
    this.setState({playlistName: name});
  }




    render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar search={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults tracks={this.state.tracks} onAdd={this.addTrack} />
            <Playlist playlist={this.state.playlist} onRemove={this.removeTrack} save={this.savePlaylist} setPlaylistName={this.setPlaylistName} playListName={this.state.playlistName} />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
