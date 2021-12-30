import React from "react";
import {Droppable} from "react-beautiful-dnd";
import Cardlink from "./Cardlink/Cardlink";


class Decklist extends React.Component{


    render() {
        return (
            <Droppable droppableId="decklist_drop_id">
                {(provided)=>(
                    <div ref={provided.innerRef} {...provided.droppableProps}
                         style={{marginBottom: '10rem'}}>
                        {this.props.cards.map((item, index) => (
                            <Cardlink
                                card={item}
                                index={index}
                                key={index}
                                dragSuffix={"view_"}
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

export default Decklist