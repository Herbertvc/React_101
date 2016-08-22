import React from 'react';

export default class SearchBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {term: ''}
  // }

  onInputChange (term) {
  	this.props.onTermChange(term);
  }

  onChange = (event) => {
    this.onInputChange(event.target.value);
  }

  render() {
    return (
      <div className="search">
        <input
          placeholder="Enter text to search for gifs!"
          type="text"
          onChange={this.onChange} 
        />
      </div>
    );
  }
}
