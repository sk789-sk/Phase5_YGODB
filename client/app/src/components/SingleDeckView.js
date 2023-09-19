import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { resolvePath, useParams, Link } from "react-router-dom";
import Header from "./Header";
import Error404 from "./Error404";


function SingleDeck () {

    const params = useParams();

    const [cardsInDeck,setCardsInDeck] = useState([{card:{name:'loading'},quantity:0,card_id:1}])
    const [deckName,setDeckName] = useState('')
    const [deckCreater,setDeckCreater] = useState('')
    const [isError,setisError] = useState(false)

    useEffect( () => {
        fetch(`/DeckViewer/${params.id}`)
        .then (resp => {
            if (resp.ok) {
                resp.json()
                .then((data) => (setCardsInDeck(data.card_in_deck),setDeckName(data.name),setDeckCreater(data.user.username)))
            }
            else{
                resp.json()
                .then((data) => console.log(data))
                .then(setisError(isError => true),setDeckName('404 - Deck Does Not Exist'))
            }
        })
    },[])

    //     .then((resp) => resp.json())
    //     .then((data) => (setCardsInDeck(data.card_in_deck),setDeckName(data.name),setDeckCreater(data.user.username)))
    // },[])

    console.log(cardsInDeck)
        
    const renderCards = cardsInDeck.map((card) => {
        return <TableRow key = {card.card_id}
        data = { [card.card.name, card.quantity ]} />
    })


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
        <div>
            <Header />
            <br></br>
            <h1 id="Single-Deck-View-Global">{ isError? deckName: deckName +' created by ' + deckCreater }</h1>
            <br></br>
            <br></br>
            {isError? <Error404/> : 
            <div className="main-content-singleDeck">
                <div className="deck-image-container">
                   <div className="deck-image">     
                        <div className="img-grid">
                            {renderDeckGridElements}
                        </div>    
                    </div>
                </div>

            {/* <div className="img-grid">
                {renderDeckGridElements}
            </div>  */}
                <div className="deck-table-container-view">
                    <div className="table-wrapper-view">
                        <table className="tables-deck-content">
                            <tbody>
                                <tr>
                                    <th>Card Name</th>
                                    <th>Quantity</th>
                                </tr>
                                {renderCards}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            }
            
        </div>
    )

}


export default SingleDeck