import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {

    if (this.props.addSubtract === '+') {
      this.props.onAdd(this.props.track);

    } else if (this.props.addSubtract === '-') {
      this.props.onRemove(this.props.track);
    }
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <div className="Track">
          <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          <a onClick={this.handleClick} className="Track-action">{this.props.addSubtract}</a>

        </div>

      </div>
    )

  }


}
