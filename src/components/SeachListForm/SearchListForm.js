import React, {useState} from 'react'
import styles from './SearchListForm.module.css'
import {Button, Dropdown, FormControl} from "react-bootstrap"
import {Collapse} from "react-collapse"

class SearchListForm extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            advanced_active: false,
            simple_input: "",
            format: "Legacy",
            affinity: "",
            atk: "",
            hp: "",
            tribe: "",
            realm: "",
            artist: "",
            creator: "",
            rarity: "",
            type: "",
            cost: ""
        }

        this.onSimpleInputChange = this.onSimpleInputChange.bind(this)
        this.resetSearchOptions = this.resetSearchOptions.bind(this)
        this.lockAdvancedSearch = this.lockAdvancedSearch.bind(this)
        this.onFormatChange = this.onFormatChange.bind(this)
        this.onTribeChange = this.onTribeChange.bind(this)
        this.onRealmChange = this.onRealmChange.bind(this)
        this.onArtistChange = this.onArtistChange.bind(this)
        this.onCreatorChange = this.onCreatorChange.bind(this)
        this.onAffinityChange = this.onAffinityChange.bind(this)
        this.onAtkChange = this.onAtkChange.bind(this)
        this.onHpChange = this.onHpChange.bind(this)
        this.onRarityChange = this.onRarityChange.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
        this.onCostChange = this.onCostChange.bind(this)
    }

    componentDidMount() {
        this.resetSearchOptions()
    }

    onSimpleInputChange(e) {
        this.setState({
            simple_input: e.target.value
        })
        this.search()
    }

    search(){
        this.props.searchAction(this.state)
    }

    lockAdvancedSearch(){
        this.setState({
            ...this.state,
            advanced_active: !this.state.advanced_active
        })
    }

    resetSearchOptions(){
        this.setState({
            simple_input: "",
            format: "Legacy",
            affinity: "",
            tribe: "",
            realm: "",
            artist: "",
            creator: ""
        }, () => this.search())
    }

    onFormatChange(k, e){
        // console.log(e.target.dataset.format)
        this.setState({
            ...this.state,
            format: e.target.dataset.format
        }, () => this.search())
        // https://stackoverflow.com/questions/38245791/react-how-to-force-state-changes-to-take-place-after-setstate
    }

    onAffinityChange(k,e){
        this.setState({
            ...this.state,
            affinity: e.target.dataset.affinity
        }, () => this.search())
    }

    getAffinityList(){
        let affinities = [""]
        this.props.cards.map(card => affinities.push(card.affinity))

        //remove duplicates and sort alphabetically
        // put 'None' at the top of the list
        // if (affinities.includes("None")){
        //     affinities.splice(affinities.indexOf("None"), 1)
        //     affinities = [...new Set(affinities)].sort()
        //     affinities.unshift("None")
        //     return affinities
        // }
        // else{

        return [...new Set(affinities)].sort()
    }

    onTribeChange(k,e){
        // console.log(e.target.dataset.tribe)
        this.setState({
            ...this.state,
            tribe: e.target.dataset.tribe
        }, () => this.search())
    }

    getTribeList(){
        // get a list of all tribes from current card pool
        let tribes = [""]
        this.props.cards.map(card => tribes.push(...card.tribe.split(' ')))

        //remove duplicates and sort alphabetically
        return [...new Set(tribes)].sort()
    }

    onRealmChange(k,e){
        // console.log(e.target.dataset.tribe)
        this.setState({
            ...this.state,
            realm: e.target.dataset.realm
        }, () => this.search())
    }

    getRealmList(){
        // get a list of all realms from current card pool
        let realms = [""]
        this.props.cards.map(card => realms.push(card.realm))

        //remove duplicates and sort alphabetically
        return [...new Set(realms)].sort()
    }

    onRarityChange(k,e){
        this.setState({
            ...this.state,
            rarity: e.target.dataset.rarity
        }, () => this.search())
    }

    getRarityList(){
        // get a list of all rarities from current card pool
        let rarities = [""]
        this.props.cards.map(card => rarities.push(card.rarity))

        //remove duplicates and sort alphabetically
        return [...new Set(rarities)].sort()
    }

    onTypeChange(k,e){
        this.setState({
            ...this.state,
            type: e.target.dataset.type
        }, () => this.search())
    }

    getTypeList(){
        // get a list of all types from current card pool
        let types = [""]
        this.props.cards.map(card => types.push(card.type))

        //remove duplicates and sort alphabetically
        return [...new Set(types)].sort()
    }

    onArtistChange(k,e){
        // console.log(e.target.dataset.tribe)
        this.setState({
            ...this.state,
            artist: e.target.dataset.artist
        }, () => this.search())
    }

    getArtistList(){
        // get a list of all artists from current card pool
        let artists = [""]
        this.props.cards.map(card => artists.push(...card.artist.split(' ')))

        //remove duplicates and sort alphabetically
        return [...new Set(artists)].sort()
    }

    onCreatorChange(k,e){
        this.setState({
            ...this.state,
            creator: e.target.dataset.creator
        }, () => this.search())
    }

    getCreatorList(){
        // get a list of all creators from current card pool
        let creators = [""]
        this.props.cards.map(card => creators.push(...card.creator.split(' ')))

        //remove duplicates and sort alphabetically
        return [...new Set(creators)].sort()
    }

    onAtkChange(k,e){
        this.setState({
            ...this.state,
            atk: e.target.dataset.atk
        }, () => this.search())
    }

    getAtkList(){
        // get a list of all atk values from current card pool
        // !!! potential bug cause actions
        let atks = [""]
        this.props.cards.map(card => {
            if(card.cost !== "")
                atks.push(card.atk)
        })

        //remove duplicates and sort
        return [...new Set(atks)].sort((a,b) => parseInt(a) - parseInt(b))
    }

    onHpChange(k,e){
        this.setState({
            ...this.state,
            hp: e.target.dataset.hp
        }, () => this.search())
    }

    getHpList(){
        // get a list of all atk values from current card pool
        // !!! potential bug cause actions
        let hps = [""]
        this.props.cards.map(card => {
            if(card.cost !== "")
                hps.push(card.hp)
        })

        //remove duplicates and sort
        return [...new Set(hps)].sort((a,b) => parseInt(a) - parseInt(b))
    }

    onCostChange(k,e){
        this.setState({
            ...this.state,
            cost: e.target.dataset.cost
        }, () => this.search())
    }

    getCostList(){
        // get a list of all cost values from current card pool
        let costs = [""]
        this.props.cards.map(card => {
            if(card.cost !== "")
                costs.push(card.cost)
        })

        //remove duplicates and sort
        return [...new Set(costs)].sort((a,b) => parseInt(a) - parseInt(b))
    }

    render() {
        // forwardRef again here!
        // Dropdown needs access to the DOM of the Menu to measure it
        const CustomMenu = React.forwardRef(
            ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
                const [value, setValue] = useState('');

                return (
                    <div
                        ref={ref}
                        style={style}
                        className={className}
                        aria-labelledby={labeledBy}
                    >
                        <FormControl
                            autoFocus
                            className="mx-auto my-2 w-75"
                            placeholder="Type to filter..."
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                        <ul className="list-unstyled">
                            {React.Children.toArray(children).filter(
                                (child) =>
                                    !value || child.props.children.toLowerCase().includes(value.toLowerCase()),
                            )}
                        </ul>
                    </div>
                );
            },
        );

        return (
            <div>
                <input
                    className={styles.simpleInput}
                    placeholder={"Search..."}
                    value={this.state.card_input}
                    onChange={this.onSimpleInputChange}
                />
                <Button onClick={this.lockAdvancedSearch}>
                    Advanced Options
                </Button>
                <Collapse isOpened={this.state.advanced_active}>
                    <Button onClick={this.resetSearchOptions}>
                        Clear Options
                    </Button>

                    <Dropdown onSelect={this.onFormatChange}>
                        <Dropdown.Toggle>
                            Format: <b>{this.state.format}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item data-format={"Legacy"}>Legacy</Dropdown.Item>
                            <Dropdown.Item data-format={"Standard"}>Standard</Dropdown.Item>
                            <Dropdown.Item data-format={"New Standard"}>New Standard</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onTribeChange}>
                        <Dropdown.Toggle>
                            Tribe: <b>{this.state.tribe || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {this.getTribeList().map((tribe, i) =>
                                <Dropdown.Item data-tribe={tribe}>{tribe || "All"}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onAffinityChange}>
                        <Dropdown.Toggle>
                            Affinity: <b>{this.state.affinity || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {this.getAffinityList().map((affinity, i) =>
                                <Dropdown.Item data-affinity={affinity}>{affinity || "All"}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onAtkChange}>
                        <Dropdown.Toggle>
                            ATK: <b>{this.state.atk || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.getAtkList().map((atk, i) =>
                                <Dropdown.Item data-atk={atk}>{atk === "" ? "All" : atk}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onHpChange}>
                        <Dropdown.Toggle>
                            HP: <b>{this.state.hp || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.getHpList().map((hp, i) =>
                                <Dropdown.Item data-hp={hp}>{hp === "" ? "All" : hp}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onCostChange}>
                        <Dropdown.Toggle>
                            Cost: <b>{this.state.cost || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.getCostList().map((cost, i) =>
                                <Dropdown.Item data-cost={cost}>{cost === "" ? "All" : cost}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onTypeChange}>
                        <Dropdown.Toggle>
                            Type: <b>{this.state.type || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {this.getTypeList().map((type, i) =>
                                <Dropdown.Item data-type={type}>{type || "All"}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onRealmChange}>
                        <Dropdown.Toggle>
                            Realm: <b>{this.state.realm || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {this.getRealmList().map((realm, i) =>
                                <Dropdown.Item data-realm={realm}>{realm || "All"}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onArtistChange}>
                        <Dropdown.Toggle>
                            Artist: <b>{this.state.artist || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {this.getArtistList().map((artist, i) =>
                                <Dropdown.Item data-artist={artist}>{artist || "All"}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onCreatorChange}>
                        <Dropdown.Toggle>
                            Creator: <b>{this.state.creator || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {this.getCreatorList().map((creator, i) =>
                                <Dropdown.Item data-creator={creator}>{creator || "All"}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={this.onRarityChange}>
                        <Dropdown.Toggle>
                            Rarity: <b>{this.state.rarity || "All"}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {this.getRarityList().map((rarity, i) =>
                                <Dropdown.Item data-rarity={rarity}>{rarity || "All"}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                </Collapse>
           </div>
        );
    }
}

export default SearchListForm