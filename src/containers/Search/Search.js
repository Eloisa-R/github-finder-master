import React, {Component} from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

const GET_REPOSITORIES = gql`
query Repository($query: String!) {
  search(query:$query, type: REPOSITORY, first: 10) { 
    edges{
      node {
      ...on Repository {
        name
        url
        owner {
          ...on RepositoryOwner {
            avatarUrl
            login
            ...on ProfileOwner {
              name
            }
          }
        }
        forkCount
        watchers {
          totalCount
        }
        stargazers {
          totalCount
        }
      }
      }
    }
    }
    }
`;
class Search extends Component {

    state = {
        searchQuery: '',
        results: [],
        isLoading: false
    }

   setLoading = loading => this.setState({isLoading: loading})

    inputChangeHandler = (event) => {
        this.setState({searchQuery: event.target.value})
    }

    onDataFetched = (data) => {
        if (data && data.search && data.search.edges) {
            this.setState({results: data.search.edges})
        }
    }

    render() {
        return (
            <div>
                <ApolloConsumer>
                    {client => (
                        <SearchBar
                            searchQuery={this.state.searchQuery}
                            changed={this.inputChangeHandler}
                            clicked={async() => {
                                this.setLoading(true)
                                const { data } = await client.query({
                                    query: GET_REPOSITORIES,
                                    variables: { query: this.state.searchQuery }
                                });
                                this.onDataFetched(data)
                                this.setLoading(false)
                            }}/>
                    )}
                </ApolloConsumer>
                {this.state.isLoading? 'Fetching repositories...' : ''}
            </div>

        )
    }
}

export default Search