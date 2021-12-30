export async function getCards(input) {
    const PUBLIC_CARDS = await (await fetch('https://server.collective.gg/api/public-cards/')).json()


    const lines = input.split('\n')

    let cards = []

    for (let i=0; i<lines.length; i++){
        if(lines[i].charAt(0) === '#' || lines[i] === '')
            continue

        let card_amount = parseInt(lines[i].charAt(0))

        let card_id = ''

        const identifier = lines[i].substring(2)
        //identifier can be:
        //      - card link
        //      - card id
        //      - card name

        // case: card link
        if(identifier.endsWith('.png')){
            card_id = /(?<=\/p\/cards\/)(.*?)(?=...png)/.exec(identifier)[0]
        }
        // case: card id
        // ! this also catches when no number is provided in front of a link !
        else if(/([a-z]|[0-9]){8}-([a-z]|[0-9]){4}-([a-z]|[0-9]){4}-([a-z]|[0-9]){4}-([a-z]|[0-9]){12}/.test(identifier)){
            card_id = identifier
        }

        // case: card name
        else{
            for(const card of PUBLIC_CARDS.cards){
                if(card.name.localeCompare(identifier, undefined, { sensitivity: 'base' }) === 0){
                    card_id = /(?<=\/p\/cards\/)(.*?)(?=...png)/.exec(card.imgurl)[0]
                }
            }
        }

        if (card_id === '') {
            console.log("INPUT ERROR")
            return []
        }

        const card_data = await (await fetch('https://server.collective.gg/api/card/'+ card_id)).json()

        let externals_suffix = "";
        if(Object.keys(card_data.externals).length > 0)
            externals_suffix = "-m"
        else{
            externals_suffix = "-s"
        }
        const card_link = 'https://files.collective.gg/p/cards/' + card_id + externals_suffix + '.png'

        const card_img = findProperty(card_data.card.Text.Properties, 'PortraitUrl').Expression.Value;

        const card_cost = findProperty(card_data.card.Text.Properties, 'IGOCost').Expression.Value

        if (isNaN(card_amount))
            card_amount = 1

        console.log(card_data.card.Text.Name)

        cards.push({
            id: card_id,
            name: card_data.card.Text.Name,
            link: card_link,
            img: card_img,
            affinity: card_data.card.Text.Affinity,
            cost: card_cost,
            amount: card_amount
        })
    }


    return cards
}

export function findProperty(parent_node, symbol_name){
    // find correct Property index
    for(let i = 0; i < parent_node.length; i++){
        if(parent_node[i].Symbol.Name === symbol_name){
            return parent_node[i];
        }
    }
    return "";
}

export default getCards