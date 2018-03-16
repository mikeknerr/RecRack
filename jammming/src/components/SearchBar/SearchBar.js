import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term: ''};
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  handleTermChange(e) {
    this.setState({term: e.target.value})
  }

  handleSearch(e) {
    this.props.search(this.state.term);
    console.log(this.state)
    e.preventDefault();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.search(this.state.term);
    }
    //e.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} placeholder="Enter A Song Title" />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }

};
