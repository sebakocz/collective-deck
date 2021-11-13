import React from "react";
import {Droppable} from "react-beautiful-dnd";
import Cardlink from "./Cardlink";


class Decklist extends React.Component{


    render() {
        return (
            <Droppable droppableId="decklist_drop_id">
                {(provided)=>(
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {this.props.cards.map((item, index) => (
                            <Cardlink
                                card={item}
                                index={index}
                                key={index}
                                amountActions={this.props.amountActions}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

// <Cardlink
//     name={"funny card"}
//     link={Math.random()}
//     amount={3}
//     index={this.state.children.length}
//     key={this.state.children.length}
// />

export default Decklist