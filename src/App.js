import './App.css';

import React from 'react';

import {Route, Routes} from "react-router-dom";
import ViewPage from "./pages/View";
import AnalysePage from "./pages/Analyse";
import CreditsPage from "./pages/Credits";
import Navigation from "./components/Navigation";
import BuildPage from "./pages/Build";
import {DragDropContext} from "react-beautiful-dnd";
import getCards from "./utils/GetCards";
import StreamPage from "./pages/Stream";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

//https://www.youtube.com/watch?v=Dorf8i6lCuk&ab_channel=Academind

class App extends React.Component{

    constructor(){
        super();

        this.state = {
            children: []
        }
    }

    onDragEnd = result => {
        const {destination, source} = result

        if(!destination){
            return
        }

        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const newList = [...this.state.children]
        const [moved] = newList.splice(source.index, 1)
        newList.splice(destination.index,0, moved)

        this.setState({
            children: newList
        })
    }

    addCardAction = (input) => {
        //const cards = await getCards(input)
        console.log(input)

        this.loadingAction(
            getCards(input)
                .then(cards => {
                    this.setState({
                        children: [
                            ...this.state.children,
                            ...cards
                        ]
                    });
                })
        )
    }

    clearAction = () => {
        this.setState({
            children: []
        })
    }

    sortByCostAction = () => {
        let cards = this.state.children
        cards.sort((a,b) => {
            return parseInt(a.cost) - parseInt(b.cost)
        })
        this.setState({
            children: cards
        })
    }

    sortByNameAction = () => {
        let cards = this.state.children
        cards.sort((a,b) => {
            return a.name.localeCompare(b.name, undefined, { numeric: true })
        })
        this.setState({
            children: cards
        })
    }

    sortByAffinityAction = () => {
        let cards = this.state.children
        cards.sort((a,b) => {
            return a.affinity.localeCompare(b.affinity, undefined, { numeric: true })
        })
        this.setState({
            children: cards
        })
    }

    exportToTextAction = () => {
        const cards = this.state.children
        let decklist = ""
        cards.map((card) => (
            decklist += card.amount + " " + card.link + "\n"
        ))
        navigator.clipboard.writeText(decklist)
        }

    optionActions = {
        clear: this.clearAction,
        sortByCost: this.sortByCostAction,
        sortByName: this.sortByNameAction,
        sortByAffinity: this.sortByAffinityAction,
        exportToText: this.exportToTextAction
    }

    addAmountAction = (index) => {
        let cards = this.state.children
        if(cards[index].amount >= 3)
            return
        cards[index].amount++
        this.setState({
            children: cards
        })
    }

    removeAmountAction = (index) => {
        let cards = this.state.children
        if(cards[index].amount <= 1) {
            cards.splice(index, 1)
        }
        else {
            cards[index].amount--
        }
        this.setState({
            children: cards
        })
    }

    amountActions = {
        add: this.addAmountAction,
        remove: this.removeAmountAction
    }

    loadingAction = (premise) => {
        this.LoadingScreen.loadingScreen(premise)
    }

    render() {
      return (
          <div>
              <Navigation/>
              <LoadingScreen ref={LoadingScreen => this.LoadingScreen = LoadingScreen}/>
              <DragDropContext onDragEnd={this.onDragEnd}>
                  <Routes>
                      <Route path="/collective-deck/"
                             element={<ViewPage cards={this.state.children}
                                                amountActions={this.amountActions}
                                                optionActions={this.optionActions}
                                                addCardAction={this.addCardAction}
                             />}
                      />
                      <Route path="/collective-deck/build"
                             element={<BuildPage cards={this.state.children}
                                                 amountActions={this.amountActions}
                                                 optionActions={this.optionActions}
                                                 addCardAction={this.addCardAction}
                             />}
                      />
                      <Route path="/collective-deck/analyse" element={<AnalysePage/>}/>
                      <Route path="/collective-deck/stream" element={<StreamPage/>}/>
                      <Route path="/collective-deck/credits" element={<CreditsPage/>}/>
                  </Routes>
              </DragDropContext>
          </div>
      );
  }
}

// function proTempl() {
//     return new Promise((resolve, reject) => {
//         if(true) {
//             resolve(true);
//         } else {
//             reject(false);
//         }
//     })
// }

export default App;
