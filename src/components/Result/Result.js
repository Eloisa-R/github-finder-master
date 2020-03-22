import React from 'react'
import Button from 'react-bootstrap/lib/Button';
import './Result.css'

const result = (props) => (
            <div className="result-wrapper flex-row flex-space-between">
                <p><em>Name</em>: {props.name}</p> <Button bsStyle="success" onClick={props.clicked}>Save</Button>
            </div>
)


export default result