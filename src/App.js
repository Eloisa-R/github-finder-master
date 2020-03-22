import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';
import SearchRepositories from './containers/SearchRepositories/SearchRepositories';

import logo from './logo.svg';
import './App.css';

// Yes, this is an unsafe way ;)
const TOKEN = 'ec58613203268fb3173afda75d58f38954f6ed7a'; // <-- TODO: place your token here
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  }),
  cache: new InMemoryCache({fragmentMatcher}),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to github repository finder</h1>
          </header>
          <SearchRepositories/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
