import React from 'react'
import {Button} from "react-bootstrap";
import getRandomLadderDeck from "../utils/GetRandomLadderDeck";

class RandomLadderDeck extends React.Component{
    render() {
        return (
            <div>
                <Button
                    variant={"secondary"}
                    onClick={async () => this.props.addCardAction(await getRandomLadderDeck())}
                >
                    See a random deck from Ladder!
                </Button>
                <p className={"App"}>OR</p>
            </div>
        );
    }
}

export default RandomLadderDeck