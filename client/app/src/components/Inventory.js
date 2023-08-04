import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";

function Inventory(){

    const [cards,setCards] = useState([])

    //this is a set code and then a numeric code, better to store as a dictoinary of set code with a list of numeric codes wouldnt have to go through everything. Refactor after 


    const user_id = 2
    useEffect( () => {
        fetch(`/inventory/${user_id}`) 
        .then((resp) => resp.json())
        .then ((data) =>setCards(data))

        // fetch('/cards')
        // .then
    },[])

    console.log(cards)
   
    //We need to make sure that the user has cards to render. If not we will get an error

    function handleClick(card){
        console.log(card)

        //When someone clicks I want to have a new popup where someone edits the card
        //When the button is associated with the card id given. 


        


        // fetch(`inventory/${user_id}` , {
        //     method: "PATCH",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body:JSON.stringify({'quantity' : new_quantity})
        //    })
        //    .then(resp => resp.json())


    }

    const renderRows = cards.map( (card) => {
        
        return <TableRow key={card.card.card_id} 
        
        data={[ card.card.name, card.card.card_type, card.card.rarity, card.card.card_image ,card.card.set_id,card.quantity]} 
        
        button ={<button onClick={ () => 
            fetch(`/inventory/${user_id}/${card.card.id}`, {
                method: "PATCH",
                headers: {
                    'Accept:' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({quantity : 4})
            })
         }>
        Edit Quantity</button>}

        deletebutton = {<button onClick={ () =>
    
            fetch(`/inventory/${user_id}/${card.card.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(console.log(card.card.id)) }>
        Delete</button>} 
        />

    })  //()=>console.log(card.card.id)

    function handleSubmit(e){
       e.preventDefault()
       let card_name = e.target['card-name'].value
       let card_quantity = e.target['quantity'].value
       let isFirst = e.target[3].checked
       let card_id = e.target['set-id'].value
       
       //We will have to check if the key (card-id exists in our file to get the actual card_id. Lets assume that we have that and complete the post req)

       // Add validation that the fields are here

       const newCard = {
        'quantity' : card_quantity,
        'isFirstEd' : isFirst,
        'user_id' : user_id,
        'card_id' : card_id
       }
       
       fetch(`inventory/${user_id}` , {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(newCard)
       })
       .then(resp => resp.json())

       //need a mapping of set id to card id

        //Onsubmit we need to: 
        //Validate that the card exists in database, validate the fields are all filled out, post request the card to db. 
    }

    return(
        <div>
            <NavBar />
            <h1>Search Bar and Filter</h1>
            <table>
                <tbody>
                <tr>
                    <th>Card Name</th>
                    <th>Card Type</th>
                    <th>Rarity</th>
                    <th>Image</th>
                    <th>Set-ID</th>
                    <th>Quantity</th>
                </tr>
                {renderRows}

                </tbody>

            </table>

            <h3>Add Card to Inventory</h3>
            <form id = "New-CardinInventory-form" onSubmit={handleSubmit}>
                <label>
                    Card Name: 
                    <input type="text" name="card-name"/>
                </label>
                <label> 
                    Card-id:
                    <input type="text" name="set-id" />
                </label>
                <label>
                    Quantity
                    <input type="integer" name="quantity" />
                </label>
                <label>
                    First Edition?
                    <input type="checkbox" name="firsted?" />
                </label>
                <button type="submit">Submit</button>
            </form>
        <input onChange={(e)=>console.log(e.target.value)} type="integer" name="new-quantity" />
        </div>
    )

}

export default Inventory