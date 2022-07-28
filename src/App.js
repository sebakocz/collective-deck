import './App.css';

import React from 'react';

import {Route, Routes} from "react-router-dom";
import ViewPage from "./pages/View";
import AnalysePage from "./pages/Analyse";
import CreditsPage from "./pages/Credits";
import Navigation from "./components/Navigation";
import BuildPage from "./pages/Build";
import {DragDropContext} from "react-beautiful-dnd";
import {getCards} from "./utils/GetCards";
import StreamPage from "./pages/Stream";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import {GoogleSpreadsheet} from "google-spreadsheet";
import { v4 as uuid } from 'uuid';

//https://www.youtube.com/watch?v=Dorf8i6lCuk&ab_channel=Academind

class App extends React.Component{

    constructor(){
        super();

        this.state = {
            children: [],
            database: [],
            saved_database:[],
            deck_data:{
                name: "",
                hero: ""
            }
        }
    }

    // # Deck Name is the first line
    // # Hero: Hero Name is the second line


    onDragEnd = result => {

        // TODO: when source searchList & destination deckList -> add from database to deckList
        // TODO: this look dumb, make it smart
        // decklist_drop_id

        const {destination, source} = result

        if(!destination)
            return;

        if(source.droppableId === "searchlist_drop_id"){
            if(destination.droppableId === "decklist_drop_id"){

                const newDeckList = [...this.state.children]
                const newSearchList = [...this.state.database]

                //let [moved] = newSearchList.splice(source.index, 1)
                let moved = newSearchList[source.index]
                moved.amount = 1
                newDeckList.splice(destination.index, 0, moved)

                this.setState({
                    children: newDeckList,
                    database: newSearchList
                })
            }
        }
        else if(source.droppableId === "decklist_drop_id"){
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
                children: newList,
                database: this.state.database
            })
        }
    }

    addCardAction = (input) => {
        const lines = input.split('\n')
        let deck_name = ""
        let deck_hero = ""
        if(lines[0].charAt(0) === '#')
            deck_name = lines[0].substring(2)
        if(lines[1].includes("# Hero:"))
            deck_hero = lines[0].substring(7)

        this.loadingAction(
            getCards(input)
                .then(cards => {
                    this.setState({
                        ...this.state,
                        children: [
                            ...this.state.children,
                            ...cards
                        ],
                        deck_data:{
                            ...this.state.deck_data,
                            name: deck_name,
                            hero: deck_hero
                        }
                    });
                })
        )
    }

    changeDeckNameAction = (input) => {
        this.setState({
            ...this.state,
            deck_data: {
                ...this.state.deck_data,
                name: input
            }
        })
    }

    changeHeroAction = (input) => {
        this.setState({
            ...this.state,
            deck_data: {
                ...this.state.deck_data,
                hero: input
            }
        })
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

        decklist += this.state.deck_data.name === "" ? "# Created via collectivedeck.codes\n" : "# " +this.state.deck_data.name + "\n"
        decklist += this.state.deck_data.hero === "" ? "# Hero: None\n" : "# " + this.state.deck_data.hero + "\n"

        cards.map((card) => (
            decklist += card.amount + " " + card.link + "\n"
        ))
        navigator.clipboard.writeText(decklist)
        }

    exportToLinkACtion = async () => {

        // Config variables
        const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
        const SHEET_ID = process.env.REACT_APP_SHEET_ID;
        const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
        const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

        const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

        const appendSpreadsheet = async (row) => {
            try {
                await doc.useServiceAccountAuth({
                    client_email: CLIENT_EMAIL,
                    private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
                });
                // loads document properties and worksheets
                await doc.loadInfo();

                const sheet = doc.sheetsById[SHEET_ID];
                const result = await sheet.addRow(row);
            } catch (e) {
                console.error('Error: ', e);
            }
        };

        // // decklist format
        const cards = this.state.children
        let decklist = ""

        decklist += this.state.deck_data.name === "" ? "# Created via collectivedeck.codes\n" : "# " +this.state.deck_data.name + "\n"
        decklist += this.state.deck_data.hero === "" ? "# Hero: None\n" : "# " + this.state.deck_data.hero + "\n"

        cards.map((card) => (
            decklist += card.amount + " " + card.link + "\n"
        ))

        // // generate unique id based on uuidv4
        const deck_id = uuid().slice(0,8)

        const newRow = { deck_id: deck_id, deck_list: decklist };

        appendSpreadsheet(newRow);

        const decklink = "https://collectivedeck.codes/?list="+deck_id

        navigator.clipboard.writeText(decklink)
    }

    optionActions = {
        clear: this.clearAction,
        sortByCost: this.sortByCostAction,
        sortByName: this.sortByNameAction,
        sortByAffinity: this.sortByAffinityAction,
        exportToText: this.exportToTextAction,
        exportToLink: this.exportToLinkACtion
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

    fillDatabaseAction = async () => {
        let cards = []

        var id = '1GqUqHDlW3gSzasXYt8LhhzigXCduWyz_Dvz2rpXzBfM';
        var gid = '0';
        var url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;
        this.loadingAction(fetch(url)
            .then(response => response.text())
            .then(data => {
                //console.log(data.substring(47).slice(0, -2))
                const _data = JSON.parse(data.substring(47).slice(0, -2))
                console.log(_data)
                _data.table.rows.forEach(async row => {
                    if (Object.keys(row.c).length === 0)
                        return;
                    if (row.c[3].v === 'Undraftable')
                        return;
                    // if (row.c[16].v !== 0)
                    //     return;

                    // uid could be fetched directly if I add a field to the google doc
                    const card_id = /(?<=\/p\/cards\/)(.*?)(?=...png)/.exec(row.c[12].v)[0]

                    // this is very hacky, I hope I can use the old version again soon
                    cards.push({
                        id: card_id,
                        name: row.c[0] ? row.c[0].v : "",
                        link: row.c[12] ? row.c[12].v : "",
                        img: row.c[15] ? row.c[15].v : "",
                        affinity: row.c[2] ? row.c[2].v : "",
                        cost: row.c[4] ? row.c[4].v : "",
                        tribe: row.c[10] ? row.c[10].v : "",
                        realm: row.c[11] ? row.c[11].v : "",
                        release_date: row.c[13] ? row.c[13].v : "",
                        ability: row.c[7] ? row.c[7].v : "",
                        creator: row.c[8] ? row.c[8].v : "",
                        artist: row.c[9] ? row.c[9].v : "",
                        atk: row.c[5] ? row.c[5].v : "",
                        hp: row.c[6] ? row.c[6].v : "",
                        rarity: row.c[3] ? row.c[3].v : "",
                        type: row.c[1] ? row.c[1].v : "",
                        state: row.c[16] ? row.c[16].v : "",
                    })
                })
            }).then(() => {
                cards = cards
                    .sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true}))
                    .sort((a, b) => parseInt(a.cost) - parseInt(b.cost))
                this.setState({
                    ...this.state,
                    database: [
                        ...cards
                    ],
                    saved_database: [
                        ...cards
                    ]
                })
            }))

        // this worked pretty well but external maintenance is meh
        // old version - this.loadingAction(fetch('https://opensheet.vercel.app/17r2KWb9eF7ceUG5VfvGgAkHm0l863OYWHJktvvh2sIQ/cards')
        // this.loadingAction(fetch('https://opensheet.elk.sh/1GqUqHDlW3gSzasXYt8LhhzigXCduWyz_Dvz2rpXzBfM/Database')
        //     .then(res => res.json())
        //     .then(data => {
        //         data.forEach(async row => {
        //             if (Object.keys(row).length === 0)
        //                 return;
        //             if (row.rarity === 'Undraftable')
        //                 return;
        //
        //             // uid could be fetched directly if I add a field to the google doc
        //             const card_id = /(?<=\/p\/cards\/)(.*?)(?=...png)/.exec(row.link)[0]
        //
        //             cards.push({
        //                 id: card_id,
        //                 name: row.name,
        //                 link: row.link,
        //                 img: row.image,
        //                 affinity: row.affinity,
        //                 cost: row.cost,
        //                 tribe: row.tribe,
        //                 realm: row.realm,
        //                 release_date: row.release_date
        //             })
        //         })
        //     })
        //     .then(() => {
        //         cards = cards
        //                     .sort((a,b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
        //                     .sort((a,b) => parseInt(a.cost) - parseInt(b.cost))
        //         this.setState({
        //             ...this.state,
        //             database: [
        //                 ...cards
        //             ],
        //             saved_database: [
        //                 ...cards
        //             ]
        //         })
        //     })
        // )
    }

    searchAction = (search_state) => {

        let result = this.state.saved_database

        // based on simple search
        const {simple_input} = search_state
        result = result.filter(card =>
            card.name.toLowerCase().includes(simple_input.toLowerCase()) ||
            card.tribe.toLowerCase().includes(simple_input.toLowerCase()) ||
            card.realm.toLowerCase().includes(simple_input.toLowerCase()) ||
            card.ability.toLowerCase().includes(simple_input.toLowerCase())
        )

        //based on format
        const {format} = search_state
        switch (format) {
            case "Legacy":
                // filterless
                // console.log("App: Legacy")
                break
            // case "Standard":
            //     // console.log("App: Standard")
            //     result = result.filter(card =>
            //         new Date(card.release_date) > new Date("2020-05-22T00:00:00.0000")
            //     )
            //     break
            // case "New Standard":
            case "Standard":
                // console.log("App: New Standard")
                result = result.filter(card =>
                    // new Date(card.release_date) > new Date("2021-05-28T00:00:00.0000") <- old wrong entry
                    //new Date(card.release_date) > new Date("2020-11-21T00:00:00.0000") <- correct time but intro cards messed up the logic
                    card.state === 0
                )
                break
            default:
                // filterless
                console.log("Missing Filter")
        }

        // based on affinity
        const {affinity} = search_state
        result = result.filter(card => card.affinity.includes(affinity))

        // based on tribe
        const {tribe} = search_state
        result = result.filter(card => card.tribe.includes(tribe))

        // based on realm
        const {realm} = search_state
        result = result.filter(card => card.realm.includes(realm))

        // based on artist
        const {artist} = search_state
        result = result.filter(card => card.artist.includes(artist))

        // based on creator
        const {creator} = search_state
        result = result.filter(card => card.creator.includes(creator))

        // based on atk
        const {atk} = search_state
        result = result.filter(card => atk === "" || parseInt(card.atk) === parseInt(atk))

        // based on hp
        const {hp} = search_state
        result = result.filter(card => hp === "" || parseInt(card.hp) === parseInt(hp))

        // based on cost
        const {cost} = search_state
        result = result.filter(card => cost === "" || parseInt(card.cost) === parseInt(cost))

        // based on rarity
        const {rarity} = search_state
        result = result.filter(card => card.rarity.includes(rarity))

        // based on type
        const {type} = search_state
        result = result.filter(card => card.type.includes(type))

        this.setState({
            ...this.state,
            database: [
                ...result
            ]
        })
    }

    render() {
      return (
          <div>
              <Navigation/>
              <LoadingScreen ref={LoadingScreen => this.LoadingScreen = LoadingScreen}/>
              <DragDropContext onDragEnd={this.onDragEnd}>
                  <Routes>
                      <Route path="/"
                             element={<ViewPage cards={this.state.children}
                                                amountActions={this.amountActions}
                                                optionActions={this.optionActions}
                                                addCardAction={this.addCardAction}
                                                changeDeckNameAction={this.changeDeckNameAction}
                                                changeHeroAction={this.changeHeroAction}
                                                deck_data={this.state.deck_data}
                             />}
                      />
                      <Route path="/build"
                             element={<BuildPage cards={this.state.children}
                                                 database={this.state.database}
                                                 saved_database={this.state.saved_database}
                                                 amountActions={this.amountActions}
                                                 optionActions={this.optionActions}
                                                 fillDatabaseAction={this.fillDatabaseAction}
                                                 searchAction={this.searchAction}
                             />}
                      />
                      <Route path="/analyse" element={<AnalysePage/>}/>
                      <Route path="/stream" element={<StreamPage/>}/>
                      <Route path="/credits" element={<CreditsPage/>}/>
                  </Routes>
              </DragDropContext>
          </div>
      );
  }
}

export default App;
