import React from 'react';
import {Button, Card} from "react-bootstrap";
import {Draggable} from "react-beautiful-dnd";

class Cardlink extends React.Component{
    render() {
        return (
            <Draggable draggableId={"drag_id_"+this.props.index} index={this.props.index}>
                {(provided)=>(
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Card className={"bg-collective affinity-"+this.props.card.affinity}>
                            <Card.Body>
                                <div>{this.props.card.name}</div>
                                <div style={{display:'flex'}}>
                                    <div>{this.props.card.amount}</div>
                                    <Button
                                        variant={"success"}
                                        className={"card-link-btn"}
                                        onClick={() => this.props.amountActions.add(this.props.index)}
                                    >+</Button>
                                    <Button
                                        variant={"danger"}
                                        className={"card-link-btn"}
                                        onClick={() => this.props.amountActions.remove(this.props.index)}
                                    >-</Button>
                                </div>
                            </Card.Body>
                            <Card.Footer>{this.props.card.id}</Card.Footer>
                        </Card>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Cardlink