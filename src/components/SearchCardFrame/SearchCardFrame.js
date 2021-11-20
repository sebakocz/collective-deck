import React from 'react'
import styles from "./SearchCardFrame.module.css"
import empty_cardframe from  "./empty_cardframe.png"
import Container from "react-bootstrap/Container";
import {Col, Form, Row} from "react-bootstrap";

class SearchCardFrame extends React.Component{
    render() {
        return (
            <div className={styles.cardFrame}>
                <Form>
                    <div className={styles.cardSize}>
                        <img src={empty_cardframe} alt={"empty cardframe"} className={styles.emptyFrame}/>
                        <input class={styles.cardName+" "+styles.cardInput} value={"(Card Name)"}/>
                    </div>
                </Form>
            </div>
        );
    }
}

export default SearchCardFrame