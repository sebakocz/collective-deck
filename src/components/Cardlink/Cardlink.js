import React from 'react';
import {Button, Card} from "react-bootstrap";
import {Draggable} from "react-beautiful-dnd";
import styles from './Cardlink.module.css'

class Cardlink extends React.Component{
    render() {
        return (
            <Draggable draggableId={"drag_id_"+this.props.index} index={this.props.index}>
                {(provided)=>(
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Card className={"bg-collective affinity-"+this.props.card.affinity+" "+styles.card}>
                            <Card.Body class={styles.cardBody}>
                                <div>{this.props.card.name}</div>
                                <div style={{display:'flex'}}>
                                    <div>{this.props.card.amount}</div>
                                    <Button
                                        variant={"success"}
                                        className={styles.cardLinkBtn}
                                        onClick={() => this.props.amountActions.add(this.props.index)}
                                    >+</Button>
                                    <Button
                                        variant={"danger"}
                                        className={styles.cardLinkBtn}
                                        onClick={() => this.props.amountActions.remove(this.props.index)}
                                    >-</Button>
                                </div>
                            </Card.Body>
                            <Card.Footer class={styles.cardFooter}>{this.props.card.id}</Card.Footer>
                        </Card>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Cardlink