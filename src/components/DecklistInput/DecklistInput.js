import React from 'react';
// eslint-disable-next-line no-unused-vars
import styles from './DecklistInput.module.css'

import {Button, Dropdown} from "react-bootstrap";

class DecklistInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            card_input: "",
            deck_name: props.deck_data.name,
            deck_hero: props.deck_data.hero
        }

        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);

        this.onHandleChangeDeckName = this.onHandleChangeDeckName.bind(this)
        this.onHeroChange = this.onHeroChange.bind(this)
    }

    // componentDidUpdate() {
    //     this.setState({
    //         ...this.state,
    //         deck_name: this.props.deck_data.name,
    //         deck_hero: this.props.deck_data.hero
    //     })
    // }

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
            ...this.state,
            card_input: ""
        })
    }

    onHandleChangeDeckName(e) {
        this.setState({
            ...this.state,
            deck_name: e.target.value
        });

        this.props.changeDeckNameAction(e.target.value)
    }

    onHeroChange(k,e){
        this.setState({
            ...this.state,
            deck_hero: e.target.dataset.hero
        })

        this.props.changeHeroAction(e.target.dataset.hero)
    }



    render() {
        return (
            <div>
                {this.props.cardsAmount > 0 &&
                <div>
                <textarea
                    rows={1}
                    placeholder={"Deck name goes here..."}
                    value={this.state.deck_name}
                    onChange={this.onHandleChangeDeckName}
                    key={this.props.state.deck_name}
                />

                    <Dropdown onSelect={this.onHeroChange}>
                    <Dropdown.Toggle>
                    Hero: <b>{this.state.deck_hero}</b>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                {["Kyung Mi", "Pearlmaw", "Buluc", "Heldim", "Ashgerdy", "Hawkins", "Baldwin", "Marie", "Vriktik", "Lazaro"].sort().map((hero, i) =>
                    <Dropdown.Item data-hero={hero}>{hero}</Dropdown.Item>
                    )}
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
                }
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