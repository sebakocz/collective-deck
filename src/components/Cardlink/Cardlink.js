import React from 'react';
import {Button, Card} from "react-bootstrap";
import {Draggable} from "react-beautiful-dnd";
import styles from './Cardlink.module.css'
import ReactTooltip from "react-tooltip";

class Cardlink extends React.Component{
// .affinity-None{
//     background-color: rgba(208, 208, 208, 0.13);
// }
// .affinity-Mind{
//     background-color: rgba(31, 161, 217, 0.13);
// }
// .affinity-Strength{
//     background-color: rgba(217, 37, 31, 0.13);
// }
// .affinity-Spirit{
//     background-color: rgba(43, 217, 31, 0.13);
// }


    get_rgba(affinity){
        let rgba
        switch (affinity) {
            case "None":
                rgba = "rgba(211,211,211,1)"
                break
            case "Mind":
                rgba = "rgba(97,180,217, 1)"
                break
            case "Strength":
                rgba = "rgba(246,156,153, 1)"
                break
            case "Spirit":
                rgba = "rgba(148,227,142, 1)"
                break
        }
        return rgba
    }

    render() {
        return (
            <Draggable draggableId={"drag_id_"+this.props.index} index={this.props.index}>
                {(provided)=>(
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Card
                            className={"bg-collective affinity-"+this.props.card.affinity+" "+styles.card}
                            data-tip
                            data-for={"card-tooltip-"+this.props.card.id}
                            style={{
                                background: `linear-gradient(103deg, `+this.get_rgba(this.props.card.affinity)+` 0%, 
                                                        `+this.get_rgba(this.props.card.affinity)+` 42%, 
                                                        rgba(255,255,255,0) 50%, 
                                                        rgba(255,255,255,0) 80%, 
                                                        `+this.get_rgba(this.props.card.affinity)+` 90%, 
                                                        `+this.get_rgba(this.props.card.affinity)+` 100%),
                                url(${this.props.card.img}) right 3rem center/50% no-repeat
                                `}}
                        >
                            <Card.Body class={styles.cardBody}>
                                <div className={styles.cardCost}>{this.props.card.cost}</div>
                                <div>{this.props.card.name}</div>
                                <div className={styles.cardCountBtns}>
                                    <div className={styles.cardCount}>{this.props.card.amount}</div>
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
                            <Card.Footer class={styles.cardFooter}>
                                <a href={this.props.card.link}
                                   target={'_blank'}
                                   rel="noreferrer">
                                        {this.props.card.id}
                                </a>
                            </Card.Footer>
                        </Card>

                        <ReactTooltip
                            id={"card-tooltip-"+this.props.card.id}
                            place={"bottom"}
                            backgroundColor={"none"}
                            className={"opaque"}
                        >
                            <img
                                src={this.props.card.link}
                                alt={"card-tooltip"}
                                width={"300px"}
                            />
                        </ReactTooltip>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Cardlink