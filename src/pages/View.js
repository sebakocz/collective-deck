import React from 'react';

import {Col, Row} from "react-bootstrap";
import Decklist from "../components/Decklist";
import Container from "react-bootstrap/Container";
import DecklistInput from "../components/DecklistInput";
import DeckView from "../components/DeckView";
import Options from "../components/Options";
import RandomLadderDeck from "../components/RandomLadderDeck";

class ViewPage extends React.Component{

    render() {
        return (
            <Container className="pt-5">
                <Row>
                    <Col xs={5}>
                        {this.props.cards.length <= 0 &&
                        <RandomLadderDeck
                            addCardAction={this.props.addCardAction}
                        />}
                        <Decklist cards={this.props.cards} amountActions={this.props.amountActions} addCardAction={this.props.addCardAction}/>
                        {this.props.cards.length > 0 && <div>
                            {this.props.cards.reduce((a,b) => a + b.amount, 0)}
                        </div>}
                        <DecklistInput addCardAction={this.props.addCardAction}/>
                        {this.props.cards.length > 0 && <Options optionActions={this.props.optionActions}/>}
                    </Col>
                    <Col>
                        <DeckView cards={this.props.cards}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ViewPage