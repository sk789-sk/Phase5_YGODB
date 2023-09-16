import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { json, useParams, Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "./Header";
import PublishIcon from '@mui/icons-material/Publish';
import DeckViewer from "./DeckView";




function SingleUsersDeck() {
    //Basically a single deck but we have edit options

    const params = useParams()

    const [cardsInDeck,setCardsInDeck] = useState([{card : {card_image:'loading', name:'loading' }, card_id:1,deck_id:1,quantity:1}]) //let load value be something? {cards : {card_image:'loading', name:'loading' }, card_id:1,deck_id:1,quantity:1}
    const [deckName,setDeckName] = useState('')
    const [newQuantity,setNewQuantity] = useState(0)

    const [refresh,setRefresh] = useState(true)

    useEffect( () => {
        fetch(`/Deck/${params.id}`)
        .then((resp) => resp.json())
        .then((data) => (setCardsInDeck(data.card_in_deck),setDeckName(data.name) ))
    },[refresh])

    //Now we want to render rows with all card info but we want to have the edit buttons to edit quantity or delete from the deck. These will go to the cardinDeck endpoint since that is what we are edditing now .

    //render functions


    //Need quantity of each card to render lets just put it into a new array to make life . This can def be done better

    let cardstorender = []
    for (let card of cardsInDeck){
        console.log(card)
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
                    .then(setRefresh(!refresh))
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
                (setRefresh(!refresh))
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

    function editName(e){
        e.preventDefault()
        let new_name = e.target[0].value
        
        fetch(`/Deck/${params.id}`, {
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




    //logic elements

    function handleSubmit(e){
        e.preventDefault()
        let deck_id = params.id
        let card_name = e.target[0].value
        let card_quantity = e.target[1].value


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
                .then((data => setCardsInDeck([...cardsInDeck,data])))
            }

            else{ //in reality this is to toggle some error message
                console.log('bye')
                resp.json()
                .then(data => console.log(data))
            }
        }
        
        )

    }

    return(
        <div>
            <Header/>

            <br></br>

            <h1 className="header">{deckName}</h1>   
            {/* this can be a small table of info  */}

            <div className="main-content-singleDeck">

                <div className="deck-image-container">
                    <div className="deck-image">     

                        <div className="img-grid">
                            {renderDeckGridElements}
                        </div>    
                    </div>
                    <div className="deck-image-buttons">
                    <form onSubmit={editName}>
                        <input className="Edit-Deck-Name" type="text" placeholder="Edit Name" />
                        <Button type="submit"><PublishIcon/></Button>

                    </form>
                    </div>
                </div>

                <div className="deck-table-container">

                    <div className="table-wrapper">
                        <table className="tables-deck-content">
                            <tbody>
                                <tr>
                                    <th>Card Name</th>
                                    <th>Quantity</th>
                                </tr>
                                {renderRows}
                            </tbody>
                        </table>
                    </div>

                    <div className="buttons-wrapper">     
                    
                        <div className="add-to-deck">
                            <p>Add Card to Deck</p>


                            <form id="New-Card-form" onSubmit={handleSubmit} >
                                    <label htmlFor="card-name">Card Name: </label>
                                    <input type="text" name="card-name"/>
                                    <br></br>
                                    <label htmlFor="card-quantity">Card Quantity: </label>
                                    <input type="integer" name="card-quantity" />
                                <button type="submit">Submit</button>
                            </form>
                        </div>

                        <input onChange={(e)=>setNewQuantity((newQuantity) => e.target.value)} type="integer" name="new-quantity" placeholder="Edit Quantity Here" />
                    </div>
                </div>        
            </div>
            <div className="footer">
                <Header />
            </div>
        </div>
    )
}

export default SingleUsersDeck

