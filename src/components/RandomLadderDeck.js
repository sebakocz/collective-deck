import {Button} from "react-bootstrap";
import getRandomLadderDeck from "../utils/GetRandomLadderDeck";

function RandomLadderDeck(props) {


    function load(){
        getRandomLadderDeck().then(deck => props.addCardAction(deck))
    }

    return (
            <div>
                <Button
                    variant={"secondary"}
                    onClick={load}
                >
                    See a random deck from Ladder!
                </Button>
                <p className={"App"}>OR</p>
            </div>
        )
}

export default RandomLadderDeck