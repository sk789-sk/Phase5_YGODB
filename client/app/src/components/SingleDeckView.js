import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { resolvePath, useParams } from "react-router-dom";

function SingleDeck () {

    const params = useParams();

    const [cardsInDeck,setCardsInDeck] = useState([])
    const [deckName,setDeckName] = useState('')
    const [deckCreater,setDeckCreater] = useState('')

    useEffect( () => {
        fetch(`/Deck/${params.id}`)
        .then((resp) => resp.json())
        .then((data) => (setCardsInDeck(data.card_in_deck),setDeckName(data.name),setDeckCreater(data.user.username)))
    },[])

    console.log(cardsInDeck)
        
    const renderCards = cardsInDeck.map((card) => {
        return <TableRow key = {card.card_id}
        data = { [card.card.name, card.quantity ]} />
    })

    console.log(deckName)
    console.log(deckCreater)

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