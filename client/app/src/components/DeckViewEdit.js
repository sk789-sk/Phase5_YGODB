import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"
import TableRow from "./Tablerow";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';




function DeckViewEditer( {cardsInDeck, toggleRefresh, id ,setDeckName, setCardsInDeck}) {

    const [newQuantity,setNewQuantity] = useState(0)

    console.log(id)
    console.log(cardsInDeck)

    console.log(cardsInDeck.length)

    let cardstorender = []
    for (let card of cardsInDeck){
        for (let i=0; i<card.quantity;i++){
            let card_obj = {name:card.card.name, image:card.card.card_image,id:card.card_id}
            cardstorender.push(card_obj)
        }
    }
    
    const renderDeckGridElements = cardstorender.map( (card) => {
    return (
        <div className="img-grid-item">
            <Link to={`/Cards/${card.id}`}>
                <img src={card.image} alt={card.name} />  
            </Link> 
        </div>
            )
        }
     ) 

     const renderSideDeckGridElements = cardstorender.slice(0,15).map( (card) => {
        return (
            <div className="img-grid-item">
                <Link to={`/Cards/${card.id}`}>
                    <img src={card.image} alt={card.name} />  
                </Link> 
            </div>
                )
            }
    )

    const renderExtraDeckGridElements = cardstorender.slice(15,30).map( (card) => {
        return (
            <div className="img-grid-item">
                <Link to={`/Cards/${card.id}`}>
                    <img src={card.image} alt={card.name} />  
                </Link> 
            </div>
                )
            }
    )

    const renderRows = cardsInDeck.map( (card) => {
        return <TableRow key={card.id} 
        data = {[card.card.name, card.quantity]}

        button ={<Button onClick={ () => 
            fetch(`/cardindeck/${card.id}`, {
                method: "PATCH",
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({'quantity' : newQuantity})
            })
            .then( resp => {
                if (resp.ok) {
                    resp.json()
                    .then(toggleRefresh())
                }
                else{
                    resp.json()
                    .then(data => console.log(data))
                }
            })
         }>
        <EditIcon /></Button>}

        deletebutton = {<Button onClick={ () =>
    
            fetch(`/cardindeck/${card.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then (resp => {
            if (resp.ok) {
                (toggleRefresh())
                // .then( data => console.log(data))
            }
            else {
                resp.json()
                .then(data => console.log(data))
            }
        })
        }>
        <DeleteIcon/></Button>}


        />
    })

    function handleSubmit(e){
        e.preventDefault()
        let deck_id = id
        let card_name = e.target[0].value
        let card_quantity = e.target[1].value

        console.log(id)


        const newCardinDeck = {
            'name' : card_name,
            'deck_id' : deck_id,
            'quantity' : card_quantity
        }

        fetch(`/cardindeck`, {
            method: 'POST',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"

            },
            body:JSON.stringify(newCardinDeck)
        })
        .then(resp => {
            if (resp.ok) {
                console.log('hi')
                resp.json()
                .then(toggleRefresh())
                // .then((data => setCardsInDeck([...cardsInDeck,data])))
            }

            else{ //in reality this is to toggle some error message
                console.log('bye')
                resp.json()
                .then(data => console.log(data))
            }
        }
        )
    }

    function editName(e){
        e.preventDefault()
        let new_name = e.target[0].value
        
        fetch(`/Deck/${id}`, {
            method:"PATCH",
            headers: {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
               body: JSON.stringify({'name' : new_name})
            })
            .then((resp) => resp.json())
            .then((data) => setDeckName((deckName) =>data.name))

        } 



    return (
        <div className="deck-container">
            <div className="deck-imageandbutton-container">
                <div className="deck-image-container">
                    <div className="main-deck">
                        <div className="main-deck-grid">
                            {renderDeckGridElements}
                        </div>
                    </div>
                    <div className="side-deck">
                        <div className="side-deck-grid">
                            {renderSideDeckGridElements}
                        </div>
                    </div>
                    <div className="extra-deck">
                        <div className="extra-deck-grid">
                            {renderExtraDeckGridElements}
                        </div>
                    </div>
                </div>
            
                <div className="deck-buttons-containers">
                        <form onSubmit={editName}>
                            <input className="Edit-Deck-Name" type="text" placeholder="Edit Name" />
                            <Button type="submit"><PublishIcon/></Button>
                        </form>
                </div>
            </div>

            <div className="deck-table-container">
                <div className="table-wrapper-edit">
                    <h3>Main Deck</h3>
                    <table className="edit-main-deck-content">
                        <thead>
                            <tr>
                                <th className="edit-name"></th>
                                <th className="edit-quant"></th>
                                <th className="EditB"></th>
                                <th className="DeleteB"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows}
                        </tbody>
                    </table>

                    <h3>Side Deck</h3>
                    <table className="edit-main-deck-content">
                        <thead>
                            <tr>
                                <th className="edit-name"></th>
                                <th className="edit-quant"></th>
                                <th className="EditB"></th>
                                <th className="DeleteB"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cardsInDeck.length===0 ? <tr><td></td><td></td><td></td><td></td></tr> : null}
                            {renderRows}
                        </tbody>
                    </table>

                    <h3>Extra Deck</h3>
                    <table className="edit-main-deck-content">
                        <thead>
                            <tr>
                                <th className="edit-name"></th>
                                <th className="edit-quant"></th>
                                <th className="EditB"></th>
                                <th className="DeleteB"></th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div className="button-wrapper-edit">
                    <div className="add-to-deck">
                        <p>Add Card to Deck</p>

                        <form className="DeckEdit-new-card-form" onSubmit={handleSubmit}>
                            <input type="text" name="card-name" placeholder="Card Name"/>
                            <input type="integer" name="card-quantity" placeholder="Card Quantity"/>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="edit-quantity-input">
                        <input onChange={(e)=>setNewQuantity((newQuantity) => e.target.value)} type="integer" name="new-quantity" placeholder="Edit Quantity Here" />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default DeckViewEditer