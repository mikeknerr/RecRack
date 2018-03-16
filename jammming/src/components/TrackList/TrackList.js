import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track.js';

export class TrackList extends React.Component {

  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {

          return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} addSubtract={this.props.addSubtract} />;
        })}
      </div>
    )
  };
};
