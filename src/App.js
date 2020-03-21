import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';
import Search from './containers/Search/Search';

import logo from './logo.svg';
import './App.css';

// Yes, this is an unsafe way ;)
const TOKEN = '95b921d34cbe281ceadc3158f60ec8cb308ec1ef'; // <-- TODO: place your token here
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
          <Search/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
