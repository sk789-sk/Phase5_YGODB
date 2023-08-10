import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { json, useParams } from "react-router-dom";

function SingleUsersDeck() {
    //Basically a single deck but we have edit options

    const params = useParams()

    const [cardsInDeck,setCardsInDeck] = useState([])
    const [deckName,setDeckName] = useState('')
    const [newQuantity,setNewQuantity] = useState(0)



    console.log(params.id)


    useEffect( () => {
        fetch(`/Deck/${params.id}`)
        .then((resp) => resp.json())
        .then((data) => (setCardsInDeck(data.card_in_deck),setDeckName(data.name) ))
    },[])

    //Now we want to render rows with all card info but we want to have the edit buttons to edit quantity or delete from the deck. These will go to the cardinDeck endpoint since that is what we are edditing now .

    console.log(cardsInDeck)

    const renderRows = cardsInDeck.map( (card) => {
        return <TableRow key={card.id} 
        data = {[card.card.name, card.quantity]}

        button ={<button onClick={ () => 
            fetch(`/cardindeck/${card.id}`, {
                method: "PATCH",
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({'quantity' : newQuantity})
            })
            .then(console.log('done'))
            .then(console.log(card.card.id))
            .then((resp) => resp.json())
            .then((json) => console.log(json))
         }>
        Edit Quantity</button>}

        deletebutton = {<button onClick={ () =>
    
            fetch(`/cardindeck/${card.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })}>
        Delete</button>}


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
            .then((data) => console.log(json))

        } 


    function handleSubmit(e){
        e.preventDefault()
        let deck_id = params.id
        let card_name = e.target[0].value
        let card_id = e.target[1].value
        let card_quantity = e.target[2].value


        const newCardinDeck = {
            'deck_id' : deck_id,
            'card_id' : card_id,
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
        .then(resp => (resp.json()))
        .then(data => setCardsInDeck(cardsInDeck => ([...cardsInDeck,data])))
    }

    return(
        <div className="componentdiv">
            <NavBar/>

            <br></br>

            <h1 className="header">{deckName}</h1>            

            <table className="tables">
                <tbody>
                    <tr>
                        <th>Card Name</th>
                        <th>Quantity</th>
                    </tr>
                    {renderRows}
                </tbody>
            </table>

        <h3>Add Card to Deck</h3>
        <form id = "New-Card-form" onSubmit={handleSubmit} >
            <label>
                Card Name: 
                <input type="text" name="card-name"/>
            </label>
            <label> 
                Card-id:
                <input type="text" name="set-id" placeholder="Ex: MRD-127" />
            </label>
            <label>
                Quantity
                <input type="integer" name="quantity" />
            </label>
            <button type="submit">Submit</button>
        </form>
        <br></br>
        <h3>Enter New Quantity Below and Press Edit Quantity Button</h3>
        <input onChange={(e)=>setNewQuantity((newQuantity) => e.target.value)} type="integer" name="new-quantity" placeholder="Edit Quantity Here" />
        
        <h3 className="header"> Edit Deck Name</h3>
            <form onSubmit={editName}>
                <input type="text" placeholder="Edit Name" />
                <button type="submit">Confirm</button>
            </form>
        </div>
    )
}

export default SingleUsersDeck

