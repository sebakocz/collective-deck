import React from 'react';

import {Col, Row} from "react-bootstrap";
import Decklist from "../components/Decklist";
import Container from "react-bootstrap/Container";
import DecklistInput from "../components/DecklistInput/DecklistInput";
import DeckView from "../components/DeckView/DeckView";
import Options from "../components/Options";
import RandomLadderDeck from "../components/RandomLadderDeck";
import {GoogleSpreadsheet} from "google-spreadsheet";
import {v4 as uuid} from "uuid";

class ViewPage extends React.Component{

    componentDidMount() {
        // reading url parameter to get a deck code
        const params = new URLSearchParams(window.location.search);
        // console.log(params.get('list'));

        const list = params.get('list')
        if(list){
            // Config variables
            const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
            const SHEET_ID = process.env.REACT_APP_SHEET_ID;
            const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
            const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

            const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

            const readSpreadsheet = async (list) => {
                try {
                    await doc.useServiceAccountAuth({
                        client_email: CLIENT_EMAIL,
                        private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
                    });
                    // loads document properties and worksheets
                    await doc.loadInfo();

                    const sheet = doc.sheetsById[SHEET_ID];
                    const rows = await sheet.getRows();

                    for (let row of rows){
                        if(row.deck_id === list){
                            console.log(row.deck_list)
                            this.props.addCardAction(row.deck_list)
                            return
                        }
                    }
                } catch (e) {
                    console.error('Error: ', e);
                }
            };

            readSpreadsheet(list)

            // this.props.addCardAction(list)
        }
    }

    render() {

        return (
            <Container className="pt-5">
                <Row>
                    <Col md={5}>
                        {this.props.cards.length <= 0 &&
                        <RandomLadderDeck
                            addCardAction={this.props.addCardAction}
                        />}
                        {this.props.cards.length > 0 &&
                        <div>
                            {this.props.cards.reduce((a,b) => a + b.amount, 0)}
                        </div>}
                        <DecklistInput
                            addCardAction={this.props.addCardAction}
                            changeDeckNameAction={this.props.changeDeckNameAction}
                            changeHeroAction={this.props.changeHeroAction}
                            cardsAmount={this.props.cards.length}
                            deck_data={this.props.deck_data}
                        />
                        {this.props.cards.length > 0 && <Options optionActions={this.props.optionActions}/>}
                    </Col>
                    <Col md={5}>
                        <Decklist
                            cards={this.props.cards}
                            amountActions={this.props.amountActions}
                            addCardAction={this.props.addCardAction}
                        />
                        {/*<DeckView cards={this.props.cards}/>*/}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ViewPage