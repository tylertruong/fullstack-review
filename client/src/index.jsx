import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getRepos();
  }

  search (term) {
    $.ajax({
      method: 'POST',
      url: `/repos`,
      data: {username: term},
      success: (data) => {
        this.getRepos();
      },
      error: (err) => {console.log('error', err)}
    });
  }

  getRepos () {
    $.ajax({
      method: 'GET',
      url: `/repos`,
      dataType: 'json',
      success: (data) => {
        console.log('data', data);
        this.setState({repos: data});
      },
      error: (err) => {console.log('OMG ERROR', err)}
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));