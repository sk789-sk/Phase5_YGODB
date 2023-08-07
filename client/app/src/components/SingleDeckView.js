import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";

function SingleDeck (id) {
    //View the deck information that is in the deck
    // Save the deck to a users inventory set it to private as default 

    //Really I just need to pull the card information of the deck here
    //Relevant Info in a table for now. Card Name Card Quantity Card Type (MST) Side Deck Extra deck

    const [deck,setDeck] = useState([]) //array of relavant deck info.

    useEffect( () => {
        fetch(`/Deck/${deckid}`)
        .then((resp) => resp.json())
        .then((data) => setDeck(data))
    },[])

    const deckid = 2 

    //Logic works but runtime error where we are trying to render the cards before loading the deck information. Strange since this less data than the others for the fetch so why?
    

    // const renderCards = deck.card_in_deck.map((card) => {
    //     return <TableRow key={card.id} 
    //     data = { [ card.card.name, card.card.card_type, card.quantity ] } />
    // } 
    // )

    //It looked liek when it assigned to a variable it would run even if its not returned. This causes an issue. Check if it exists even creating the function then i guess we can render anytime?

    function renderCards(deck){
        deck.card_in_deck.map((card) => {
            return <TableRow key={card.id} 
            data = { [card.card.name, card.card.card_type,card.quantity ] } />
        })
    }

    console.log(deck)
    //Okay we only run the function if deck has a length. Ok Deck is not an array it is an object. 

    return (
        <div>
            <NavBar />
            <h1>SingleDeckTest</h1>
            <h3>Relevant User/Deck information</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Card</th>
                        <th>Type</th>
                        <th>Quantity</th>
                    </tr>
                    {deck.length ? renderCards(deck):'loading'}
                </tbody>
            </table>
        </div>
    )
}

export default SingleDeck