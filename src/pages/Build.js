import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import RandomLadderDeck from "../components/RandomLadderDeck";
import Decklist from "../components/Decklist";
import DecklistInput from "../components/DecklistInput/DecklistInput";
import Options from "../components/Options";
import DeckView from "../components/DeckView/DeckView";
import Container from "react-bootstrap/Container";
import SearchCardFrame from "../components/SearchCardFrame/SearchCardFrame";
import SearchList from "../components/SearchList";
import SearchListForm from "../components/SeachListForm/SearchListForm";

class BuildPage extends React.Component{
    render() {
        return (
            // <div className={"App"}>Under construction...</div>
            <Container className="pt-5">
                <Row>
                    <Col md={5}>
                        {this.props.saved_database.length <= 0 &&
                            <Button variant={"primary"} onClick={this.props.fillDatabaseAction}>Load All Cards</Button>
                        }
                        {this.props.saved_database.length > 0 &&
                            <SearchListForm searchAction={this.props.searchAction} cards={this.props.database}/>
                        }
                        <SearchList cards={this.props.database}/>
                    </Col>
                    <Col md={5}>
                        <Decklist cards={this.props.cards}
                                  amountActions={this.props.amountActions}
                                  addCardAction={this.props.addCardAction}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BuildPage