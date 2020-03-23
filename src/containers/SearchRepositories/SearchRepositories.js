import React, {Component} from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import Results from '../Results/Results'
import Cards from '../Cards/Cards'
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import Grid from 'react-bootstrap/lib/Grid'
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

const GET_REPOSITORIES = gql`
query Repository($query: String!) {
  search(query:$query, type: REPOSITORY, first: 10) { 
    edges{
      node {
      ...on Repository {
        id
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
class SearchRepositories extends Component {

    state = {
        searchQuery: '',
        results: [],
        isLoading: false,
        newCardToAdd: null,
        error: null
    }

   setLoading = loading => this.setState({isLoading: loading})

    setError = error => this.setState({error})

    fetchData = async(client) => {
        this.setLoading(true)
        try {
            const { data } = await client.query({
                query: GET_REPOSITORIES,
                variables: { query: this.state.searchQuery }
            });
            this.onDataFetched(data)
        } catch (e) {
           this.setError(e)
        } finally {
            this.setLoading(false)
        }

    }

    preventDefault = event => event.preventDefault()

    inputChangeHandler = (event) => {
        this.setState({searchQuery: event.target.value})
    }

    onDataFetched = (data) => {
        if (data && data.search && data.search.edges) {
            this.setState({results: data.search.edges})
        }
    }

    handleResultClick = (id) => {
        const newCardToAdd = this.state.results.find(result => result.node.id === id)
        this.setState({newCardToAdd})
    }

    render() {
        return (
            <div>
                <ApolloConsumer>
                    {client => (
                        <SearchBar
                            searchQuery={this.state.searchQuery}
                            changed={this.inputChangeHandler}
                            onFormSubmit={this.preventDefault}
                            keyPressed={(event) => {
                                if (event.key === "Enter") {
                                this.fetchData(client)
                            }}}
                            clicked={() => this.fetchData(client)
                            }/>
                    )}
                </ApolloConsumer>
                <Grid className="">
                    <Row className="show-grid flex-row">
                        <Col  xs={8} md={8} lg={12}>
                    <Cards newCardToAdd={this.state.newCardToAdd}/>
                        </Col>
                        <Col xs={8} md={8} lg={12}>
                            <Results
                                loading={this.state.isLoading}
                                results={this.state.results}
                                error={this.state.error}
                                handleResultClick={this.handleResultClick}/>
                        </Col>
                    </Row>
                </Grid>
            </div>

        )
    }
}

export default SearchRepositories