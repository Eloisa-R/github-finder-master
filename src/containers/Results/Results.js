import React from 'react'
import Result from '../../components/Result/Result'

const results =(props) => {
    let results = null;
    if (props.results.length) {
        results = props.results.map(result => {
                return <Result
                    key={result.node.id}
                    name={result.node.name}
                    clicked={() => props.handleResultClick(result.node.id)}/>
            })
    }
    return (
            <div>
                    <h4>Search Results</h4>
            {props.loading? 'Fetching repositories...': results}
            </div>
                )
}

export default results