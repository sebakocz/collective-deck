import React from 'react'
import CardImage from "../CardImage/CardImage";
import styles from "./DeckView.module.css"

class DeckView extends React.Component{
    render() {
        return (
            <div className={styles.deckviewContainer}>
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