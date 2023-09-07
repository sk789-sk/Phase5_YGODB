import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { resolvePath, useParams, Link } from "react-router-dom";


function SingleDeck () {

    const params = useParams();

    const [cardsInDeck,setCardsInDeck] = useState([{card:{name:'loading'},quantity:0,card_id:1}])
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
    console.log('hello')

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

    return (
        <div className="componentdiv">
            <NavBar />
            <h3>{deckName} created by {deckCreater}</h3>

            <div className="img-grid">
                {renderDeckGridElements}
            </div> 

            <table className="tables">
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