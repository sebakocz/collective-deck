import React from 'react'
import {Button, Dropdown} from "react-bootstrap";

class Options extends React.Component{
    render() {
        return (
            <div className={"page-bottom"}>
                <Button variant={"secondary"} onClick={this.props.optionActions.clear}>Clear</Button>

                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Export As
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="" onClick={this.props.optionActions.exportToText}>Text</Dropdown.Item>
                        <Dropdown.Item href="">~~SOON~~ Link ~~SOON~~</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Sort By
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="" onClick={this.props.optionActions.sortByCost}>Cost</Dropdown.Item>
                        <Dropdown.Item href="" onClick={this.props.optionActions.sortByName}>Name</Dropdown.Item>
                        <Dropdown.Item href="" onClick={this.props.optionActions.sortByAffinity}>Affinity</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export default Options