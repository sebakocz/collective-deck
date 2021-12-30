import React from 'react';
// eslint-disable-next-line no-unused-vars
import styles from './DecklistInput.module.css'

import {Button} from "react-bootstrap";

class DecklistInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            card_input: ""
        }

        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    onHandleChange(e) {
        this.setState({
            ...this.state,
            card_input: e.target.value
        });
    }

    onHandleSubmit(e) {
        e.preventDefault();

        this.props.addCardAction(this.state.card_input)

        this.setState({
            card_input: ""
        })
    }

    render() {
        return (
            <div>
            <textarea
                rows={3}
                placeholder={"Card links go here..."}
                value={this.state.card_input}
                onChange={this.onHandleChange}
            />

                <Button
                    variant={"secondary"}
                    onClick={this.onHandleSubmit}
                >
                    Add Card(s)!
                </Button>
            </div>
        );
    }
}

export default DecklistInput