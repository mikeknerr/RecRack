import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList.js';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
}

    handleChange(e) {
    const playlistTitle = e.target.value;
    this.props.setPlaylistName(playlistTitle);

  }

  handleClick(e) {
    let playlistUris = this.props.playlist.map(track => track.uri);
    console.log(playlistUris);
    this.props.save(this.props.playListName, playlistUris);
    e.preventDefault();
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playListName} onChange={this.handleChange} />
        <TrackList tracks={this.props.playlist} onRemove={this.props.onRemove} addSubtract={'-'} />

        <a className="Playlist-save" onClick={this.handleClick} >SAVE TO SPOTIFY</a>
      </div>
    )
  }
}
