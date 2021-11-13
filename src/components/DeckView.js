import React from 'react'
import CardImage from "./CardImage";

class DeckView extends React.Component{
    render() {
        return (
            <div className={"deckview-container"}>
                {this.props.cards.map((item, index) => (

                    <CardImage
                        card={item}
                        key={index}
                    />
                ))}
            </div>
        );
    }
}

export default DeckView