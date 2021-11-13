import React from 'react'
import ReactTooltip from "react-tooltip";

class CardImage extends React.Component{
    render() {
        return (
            <a
                href={this.props.card.link}
                target={'_blank'}
                className={'card-img'}
                style={{backgroundImage: `url(${this.props.card.img})`}} rel="noreferrer"
                data-tip
                data-for={"card-tooltip-"+this.props.card.id}
            >
                <p>{this.props.card.name}</p>

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
            </a>
        );
    }
}

export default CardImage