import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import Decklist from "../components/Decklist";
import Container from "react-bootstrap/Container";
import SearchList from "../components/SearchList";
import SearchListForm from "../components/SeachListForm/SearchListForm";

class BuildPage extends React.Component{

    triggerPaginationReset(){
        this.searchlist.changePage({"selected":0})
    }

    render() {
        return (
            <Container className="pt-5">
                <Row>
                    <Col md={5}>
                        {this.props.saved_database.length <= 0 &&
                            <Button variant={"primary"} onClick={this.props.fillDatabaseAction}>Load All Cards</Button>
                        }
                        {this.props.saved_database.length > 0 &&
                            <SearchListForm searchAction={this.props.searchAction}
                                            cards={this.props.database}
                                            paginationResetAction={this.triggerPaginationReset.bind(this)}
                            />
                        }
                        <SearchList cards={this.props.database}
                                    ref={searchlist => this.searchlist = searchlist}
                        />
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