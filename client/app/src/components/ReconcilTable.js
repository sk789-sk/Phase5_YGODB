import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"


function ReconTable({userDecks, id}){

    //This table wants to figure out what cards you have in your decks and what cards you have in your inventories and the difference between them. 

    //we will have less cards in deck then cards we own on average so lets make the list of cards by going through the deck. 
    //Take a deck, take the cards in the deck and the quantities and add it to the table. We want to know what deck the card is used in as well. 

    //A deck belongs to a user and is a list of cards
    //If we load all the decks a user has we have a list of cards

    //An inventory is a list of cardsinSets (aka physical card)
    //Each physical card references a single card_id, which is a card. So we can take someones inventory and extend it to show the card_id. To see if a user has a copy of a card we have to scan the entire inventory, This is basically a see if a value exists in an array, but the array has no sorting or etc. We could use a hash to just see the values right away. We still need to compile a map of the users inventory and users decks. 


    // just to have it done, we take the users inventory turn cardInset into the card_id and then multiple the quantity to see how many copies of a card we have. ex 3 pot of greed.
    //We map these values into a map and keep that as your simple inventory. 

    //We then do the same thing to cards in decks. See what deck id a user has, and then get the card_id and quantity of those. We turn that into a map and we now can compare the values. If it exists we compare and put value in reccon table. if not we add the value to recon table and display. 

    //would probably be better to just do this on the backend,

    //We can take the deck a user

    //get card cound from users decks

    const [cardsInInventory,setCardsInInventory] = useState([])
    const [cardsNeeded,setCardsNeeded] = useState([])

    //Lets create our object with card_id and the quantities needed.

    const cardsInDecks = {}

    for (let i=0; i < userDecks.length ;i++) {
        for (let j=0; j < userDecks[i].card_in_deck.length;j++) {

            let card_id = (userDecks[i].card_in_deck[j].card_id)
            let quantity = (userDecks[i].card_in_deck[j].quantity)

            if (card_id in cardsInDecks){
                let new_q = cardsInDecks[card_id] + quantity
                cardsInDecks[card_id] = new_q
            }
            else{
                cardsInDecks[card_id] = quantity
            }
        }
    }


    // now we need to send this information to the backend, we have card_id and quantity and compare this to the inventory


    //onClick of the button we create the table
    function createTableData(e) {

        fetch(`InventRecon/${id}`, {
            method: 'POST',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cardsInDecks)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => setCardsNeeded(data))
            }
            else{
                resp.json()
                .then(data => console.log(data))
            } 
        })

        console.log(cardsNeeded)
    }
    

    return (
        <div>
            hello   
            <button onClick={createTableData}>Reconcile Inventory and All Decks</button>
        </div>
    )
}

export default ReconTable