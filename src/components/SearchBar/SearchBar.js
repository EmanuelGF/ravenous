import React from 'react';
import './SearchBar.css';

const apiKey = '';
const url = 'https://api.yelp.com/v3/businesses/search?';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {term: '',location: '' , sortBy: 'best_match'};
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highes Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getSortByClass(sortByOption){
    return (sortByOption === this.state.sortBy) ? 'active' : '';    
  }

  handleSortByChange(sortByOption){
    this.setState({sortBy: sortByOption});
  }

  handleTermChange(event){
    this.setState({ term: event.target.value });
  }

  handleLocationChange(event){
    this.setState({ location: event.target.value });
    event.preventDefault();
  }

  handleSearch(event){
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
    let sortByOptionValue = this.sortByOptions[sortByOption];
    return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>;
  });
}

  render() {
    return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {this.renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
        <input placeholder="Where?" onChange={this.handleLocationChange} />
      </div>
      <div className="SearchBar-submit">
        <a onClick={this.handleSearch}>Let's Go</a>
      </div>
    </div>
  );
  }
}


export default SearchBar;
