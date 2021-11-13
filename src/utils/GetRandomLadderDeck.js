async function getRandomLadderDeck(){
    const deck_data = await (await fetch('https://server.collective.gg/api/public/leaderboards')).json()
    const random_deck = deck_data.multi[Math.floor(Math.random() * deck_data.multi.length)];
    let deck_text = ""
    for(let card in random_deck.cards){
        deck_text += random_deck.cards[card] + " " + card + "\n"
    }
    return deck_text
}

export default getRandomLadderDeck