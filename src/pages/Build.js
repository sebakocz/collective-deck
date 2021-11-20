import React from 'react';
import {Col, Row} from "react-bootstrap";
import RandomLadderDeck from "../components/RandomLadderDeck";
import Decklist from "../components/Decklist";
import DecklistInput from "../components/DecklistInput/DecklistInput";
import Options from "../components/Options";
import DeckView from "../components/DeckView/DeckView";
import Container from "react-bootstrap/Container";
import SearchCardFrame from "../components/SearchCardFrame/SearchCardFrame";

class BuildPage extends React.Component{
    render() {
        return (
            <div className={"App"}>Under construction...</div>
            // <Container className="pt-5">
            //     <Row>
            //         <Col md={5}>
            //             <Decklist cards={this.props.cards} amountActions={this.props.amountActions} addCardAction={this.props.addCardAction}/>
            //             {this.props.cards.length > 0 && <div>
            //                 {this.props.cards.reduce((a,b) => a + b.amount, 0)}
            //             </div>}
            //             <DecklistInput addCardAction={this.props.addCardAction}/>
            //             {this.props.cards.length > 0 && <Options optionActions={this.props.optionActions}/>}</Col>
            //         <Col md={7}>
            //             Searched cards go here!
            //             {/*<SearchCardFrame/>*/}
            //         </Col>
            //     </Row>
            // </Container>
        )
    }
}

export default BuildPage