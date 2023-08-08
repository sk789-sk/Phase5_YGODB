import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import Decks from "./Decks";

function SingleDeck ({id}) {

    const deckid = 2

    const [cardsInDeck,setCardsInDeck] = useState([])
    const [deckName,setDeckName] = useState('')
    const [deckCreater,setDeckCreater] = useState('')

    useEffect( () => {
        fetch(`Deck/${deckid}`)
        .then((resp) => resp.json())
        .then((data) => (setCardsInDeck(data.card_in_deck),setDeckName(data.name),setDeckCreater(data.user.username)))
    },[])
        
    const renderCards = cardsInDeck.map((card) => {
        return <TableRow key = {card.card_id}
        data = { [card.card.name, card.quantity ]} />
    })

    console.log(deckName)
    console.log(deckCreater)

    // useEffect( () => {
    //     fetch(`Deck/${deckid}`)
    //     .then((resp) => resp.json())
    //     .then((data) => setCardsInDeck(data))
    // },[])

    // console.log(cardsInDeck.card_in_deck)

    // // const renderCards = cardsInDeck.card_in_deck.map((card) => {
    // //     return <TableRow key={card.id} 
    // //     data = {[ card.card.name, card.card.quantity ]} />
    // // })

    return (
        <div>
            <NavBar />
            <h3>{deckName} created by {deckCreater}</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Card Name</th>
                        <th>Quantity</th>
                    </tr>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )

}


export default SingleDeck