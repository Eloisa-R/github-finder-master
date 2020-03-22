import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import PanelBody from "react-bootstrap/lib/PanelBody";
import Button from 'react-bootstrap/lib/Button';
import './Card.css'

const card = (props) => (
    <Panel>
            <PanelBody className="flex-row flex-space-between">
                <img className="card-profile-picture" src={props.repo.node.owner.avatarUrl} alt="Repository Owner"/>
                <div className="card-text-container">
                    <p><em>Name</em> {props.repo.node.name}</p>
                    <p><em>Owner</em>: {props.repo.node.owner.name || props.repo.node.owner.login}</p>
                    <p><em>Fork count</em>: {props.repo.node.forkCount}</p>
                    <p><em>Watchers</em>: {props.repo.node.watchers.totalCount}</p>
                    <p><em>Stargazers</em>: {props.repo.node.stargazers.totalCount}</p>
                </div>
                <Button className="card-remove-button" bsStyle="danger" onClick={props.clicked}>Remove</Button>

            </PanelBody>

    </Panel>
)

export default card