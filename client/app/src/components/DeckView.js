import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"


function DeckViewer(id){

    //input will be an array cards that make up a deck

    const [cardsInDeck,setCardsInDeck] = useState([])

    id = 3

    useEffect( () => {
        fetch(`/Deck/${id}`)
        .then(resp => resp.json())
        .then(data => setCardsInDeck(data.card_in_deck))
    },[])

    let cardstorender = []
    for (let card of cardsInDeck){
        for (let i=0; i<card.quantity;i++){
            let card_obj = {name:card.card.name, image:card.card.card_image,id:card.card_id}
            cardstorender.push(card_obj)
        }
    }

    const renderDeckGridElements = cardstorender.map( (card) => {
        return (
            <div className="main-deck-grid-item">
                <Link to={`/Cards/${card.id}`}>
                    <img src={card.image} alt={card.name} />  
                </Link> 
            </div>
                )
            }
    )
    
    let cards = [{id:1,name:'Dark Magician',quantity:1},{id:2,name:'Blue Eyes White Dragon of doom and gloom',quantity:2}]
    const renderTableRow = cardsInDeck.map ( (card) => {
        console.log(card)
        return (
            <tr>
                
                <td className="card-name">
                <Link to={`/Cards/${card.card_id}`}>{card.card.name}</Link>
                </td>    
                <td className="card-quantity">{card.quantity}</td>
            </tr>
        )
    })

    return (
        <div className="deck-container">  { /*everything image and table */}
            <div className="deck-image-container-t">
                <div className="main-deck">
                    <div className="main-deck-grid">
                        {renderDeckGridElements}
                    </div>
                </div>
                <div className="side-deck">
                    <div className="side-deck-grid">
                        render side deck grid elements
                    </div>
                </div>
                <div className="extra-deck">
                    <div className="extra-deck-grid">
                        r
                    </div>
                </div>                
            </div>
            <div className="deck-table-container-t">
                <div className="table-wrapper">
                    <table className="deck-table-content">
                        <thead>
                            <tr>
                                
                                <th className="name-header">Name</th>
                                <th className="quant-header"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRow}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default DeckViewer