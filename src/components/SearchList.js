import React from 'react'
import Cardlink from "./Cardlink/Cardlink";
import {Droppable} from "react-beautiful-dnd";
import ReactPaginate from 'react-paginate'

class SearchList extends React.Component {
    cardsPerPage = 10;

    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 0,
            pagesVisited: 0
        }

        this.changePage = this.changePage.bind(this)
    }

    updatePageVisited(){
        const pageVisited = this.state.pageNumber * this.cardsPerPage
        const pageNumber = this.state.pageNumber
        this.setState({
            pageNumber: pageNumber,
            pagesVisited: pageVisited
        })
    }

    changePage = ({selected}) => {
        console.log(selected)
        const pageVisited = selected * this.cardsPerPage
        this.setState({
            pageNumber: selected,
            pagesVisited: pageVisited
        })
    }


    render() {
        return (
            <div>
                <Droppable droppableId="searchlist_drop_id">
                    {(provided)=>(
                        <div ref={provided.innerRef} {...provided.droppableProps}
                             style={{marginBottom: '1rem'}}>
                            {this.props.cards.slice(this.state.pagesVisited, this.state.pagesVisited + this.cardsPerPage).map((item, index) => (
                                <Cardlink
                                    card={item}
                                    index={index}
                                    key={index}
                                    dragSuffix={"build_"}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={Math.ceil(this.props.cards.length/this.cardsPerPage)}
                    onPageChange={this.changePage}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
        );
    }
}

export default SearchList