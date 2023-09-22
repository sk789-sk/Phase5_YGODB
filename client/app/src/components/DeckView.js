import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"


function DeckViewer({cardsInDeck, id}){

    //input will be an array cards that make up a deck


    console.log(id)

    console.log(cardsInDeck)

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

    const renderMainDeckGridElements = maindeck.map( (card) => {
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

    
    const renderMaindeckTableRow = cardsInDeck.filter((card) => card.location === 'main').map ( (card) => {
        return (
            <tr>
                <td className="card-name">
                <Link to={`/Cards/${card.card_id}`}>{card.card.name}</Link>
                </td>    
                <td className="card-quantity">{card.quantity}</td>
            </tr>
        )
    })

    const renderSidedeckTableRow = cardsInDeck.filter((card) => card.location === 'side').map ( (card) => {
        return (
            <tr>
                <td className="card-name">
                <Link to={`/Cards/${card.card_id}`}>{card.card.name}</Link>
                </td>    
                <td className="card-quantity">{card.quantity}</td>
            </tr>
        )
    })

    const renderExtradeckTableRow = cardsInDeck.filter((card) => card.location === 'extra').map ( (card) => {
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
        <div className="deck-container">  
            <div className="deck-image-container-t">
                    <div className="main-deck">
                        <div className="main-deck-grid">
                            {renderMainDeckGridElements}
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


            <div className="deck-table-container-t">
                <div className="table-wrapper-view">
                    <h3>Main Deck</h3>
                    <table className="deck-table-content">
                        <thead>
                            <tr>   
                                <th className="name-header"></th>
                                <th className="quant-header"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderMaindeckTableRow}
                        </tbody>
                    </table>
                    <h3>Side Deck</h3>
                    <table className="deck-table-content">
                    <thead>
                            <tr>   
                                <th className="name-header"></th>
                                <th className="quant-header"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderSidedeckTableRow}
                        </tbody>
                    </table>
                    <h3>Extra Deck</h3>

                    <table className="deck-table-content">
                    <thead>
                            <tr>   
                                <th className="name-header"></th>
                                <th className="quant-header"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderExtradeckTableRow}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default DeckViewer