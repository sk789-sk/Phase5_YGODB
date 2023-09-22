import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"
import TableRow from "./Tablerow";


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

    const path = `/Cards/`

    const cardsInDecks = {}
    const cardsperDeck = {}

    for (let i=0; i < userDecks.length ;i++) {
        for (let j=0; j < userDecks[i].card_in_deck.length;j++) {

            let card_id = (userDecks[i].card_in_deck[j].card_id)
            let quantity = (userDecks[i].card_in_deck[j].quantity)
            let deck_name = (userDecks[i].name)
            let card_name = (userDecks[i].card_in_deck[j].card.name)

            if (card_id in cardsInDecks){
                let new_q = cardsInDecks[card_id] + quantity
                cardsInDecks[card_id] = new_q
            }
            else{
                cardsInDecks[card_id] = quantity
            }

            if (card_name in cardsperDeck){
                cardsperDeck[card_name] = [...cardsperDeck[card_name],`${quantity} used in ${deck_name}`]
            }
            else(
                cardsperDeck[card_name] = [`${quantity} used in ${deck_name}`]
            )
        }
    }

    function objtoArr(cards_obj) {        //theres an object.entires method that just does this easily 
        const cardsArr = []
        for (let key in cards_obj){
            const tempArr = []
            tempArr.push(key)
            tempArr.push(cards_obj[key])
            cardsArr.push(tempArr)
        }
        return cardsArr
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
                // .then(data => objtoArr(data)) //convert data into array here
                .then(val => setCardsNeeded(val))
            }
            else{
                resp.json()
                .then(data => console.log(data))
            } 
        })

    }  

    console.log(cardsNeeded)

    //need a function that takes an string input. then goes through the object array and for each one it retuns a <p>text<p><br><br>

    const renderRows = cardsNeeded.map( (val) => {
    
        // console.log(cardsperDeck[val[0]])

        return (
            <tr>
                <td>
                    <Link to={`${path}${val.id}`}> {val.name} </Link>
                </td>
                <td>{val.owned}</td>
                <td>{val.required}</td>
                <td>{val.need}</td>
                <td>
                    <ul>
                        {cardsperDeck[val.name].map((value,idx) => {
                            return (<li className="uncenter" key={idx}>{value}</li> )
                        })}
                        <br></br>
                    </ul>
                </td>
            </tr>
        )
    } 
     )

    return (
        <div>
            <button onClick={createTableData}>Reconcile Inventory and All Decks</button>

            <div>
            {(cardsNeeded.length !==0) ?
            
            <table>
            <thead>
                <tr>
                    <th>Card Name</th>
                    <th>Owned</th>
                    <th>Required</th>
                    <th>Needed</th>
                    <th>Usage Breakdown</th>
                </tr>
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
            
            : null}
            </div>
        </div>
    )
}

export default ReconTable