import React from 'react'
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import './SearchBar.css'

const searchBar = (props) => (
    <Grid>
        <Row className="show-grid flex-center">
            <Col  xs={12} md={8} lg={8}>
                <form className="search-form-wrapper flex-row">
                    <FormGroup controlId="repoSearchField" className="search-input-wrapper flex-grow">
                        <ControlLabel>Search for a Repository</ControlLabel>
                        <FormControl type="search" placeholder="Type your search here" value={props.searchQuery} onChange={props.changed}/>
                    </FormGroup>
                    <Button bsStyle="primary" className="search-button" onClick={props.clicked}>Search</Button>
                </form>
            </Col>
        </Row>
    </Grid>

)

export default searchBar