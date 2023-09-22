import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"
import TableRow from "./Tablerow";
import { Button, Checkbox } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';




function DeckViewEditer( {cardsInDeck, toggleRefresh, id ,setDeckName, setCardsInDeck}) {

    const [newQuantity,setNewQuantity] = useState(0)

    let cardstorender = []
    for (let card of cardsInDeck){
        for (let i=0; i<card.quantity;i++){
            let card_obj = {name:card.card.name, image:card.card.card_image,id:card.card_id,location:card.location}
            cardstorender.push(card_obj)
        }
    }

    const maindeck = cardstorender.filter( (card) => 
        card.location==='main'
    )

    const sidedeck = cardstorender.filter( (card) => 
        card.location==='side'
    )

    const extradeck = cardstorender.filter( (card) => 
        card.location==='extra'
    )
    
    const renderDeckGridElements = maindeck.map( (card) => {
    return (
        <div className="img-grid-item">
            <Link to={`/Cards/${card.id}`}>
                <img src={card.image} alt={card.name} />  
            </Link> 
        </div>
            )
        }
     ) 

     const renderSideDeckGridElements = sidedeck.map( (card) => {
        return (
            <div className="img-grid-item">
                <Link to={`/Cards/${card.id}`}>
                    <img src={card.image} alt={card.name} />  
                </Link> 
            </div>
                )
            }
    )

    const renderExtraDeckGridElements = extradeck.map( (card) => {
        return (
            <div className="img-grid-item">
                <Link to={`/Cards/${card.id}`}>
                    <img src={card.image} alt={card.name} />  
                </Link> 
            </div>
                )
            }
    )

    function renderRowT(card) {
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
        <DeleteIcon/></Button>}/>
    }



    //filter the cardsInDeck to appropriate vals i guess

    const renderMaindeckTable = cardsInDeck.filter((card) => card.location === 'main').map(renderRowT)
    const renderSidedeckTable = cardsInDeck.filter((card)=>card.location==='side').map(renderRowT)
    const renderExtradecktable = cardsInDeck.filter((card)=>card.location==='extra').map(renderRowT)


    function handleSubmit(e){
        e.preventDefault()
        console.log(e)
        console.log(e.target['location'].value)
        let deck_id = id
        let card_name = e.target[0].value
        let card_quantity = e.target[1].value
        let location = e.target['location'].value

        const newCardinDeck = {
            'name' : card_name,
            'deck_id' : deck_id,
            'quantity' : card_quantity,
            'location' : location
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
                            {renderMaindeckTable}
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
                            {renderSidedeckTable}
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
                            {renderExtradecktable}
                        </tbody>
                    </table>
                </div>
                <div className="button-wrapper-edit">
                    <div className="add-to-deck">
                        <p>Add Card to Deck</p>

                        <form className="DeckEdit-new-card-form" onSubmit={handleSubmit}>
                            <input className="deck-edit-input" type
                            ="text" name="card-name" placeholder="Card Name"/>
                            <input className="deck-edit-input" type="integer" name="card-quantity" placeholder="Card Quantity"/>

                            <div className="Deck-Edit-Buttons">                        
                                <input id="main" type="radio" name="location" value={'main'}></input>
                                <label htmlFor="main">Main</label>

                                <input id="side" type="radio" name="location" value={'side'}></input>
                                <label htmlFor="side">Side</label>
                                
                                <input id="extra" type="radio" name="location" value={'extra'}></input>
                                <label htmlFor="extra">Extra</label>

                                <button type="submit">Submit</button>
                            </div>
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