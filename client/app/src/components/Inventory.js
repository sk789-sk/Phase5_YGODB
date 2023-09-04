import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { Link } from "react-router-dom";
import { Button, Icon, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


function Inventory({user}){

    const [cards,setCards] = useState([])
    const [newQuantity,setNewQuantity] = useState(0)
    const [filtertext,setFilterText] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const [isError,setIsError] = useState(false)
    //this is a set code and then a numeric code, better to store as a dictoinary of set code with a list of numeric codes wouldnt have to go through everything. Refactor after 
    //useState seems like a bad way to do this. I would rather give each one its own 

    useEffect( () => {
        fetch(`/inventory/${user.id}`) 
        .then((resp) => resp.json())
        .then ((data) =>setCards(data))
    },[])
    

    //We need to make sure that the user has cards to render. If not we will get an error
    // what does setCards equal if there is nothing in the fetch?
    
    function handleSearch(e){
        e.preventDefault()
        setFilterText((filtertext) =>e.target[0].value)
        console.log(filtertext)
    }

    console.log(cards)

    const filteredCards = cards.filter((card) => {
        return (card.cardinSet.card.name.toLowerCase().includes(filtertext.toLowerCase()))
    })

    const renderRows = filteredCards.map( (card) => {
        
        return <TableRow  
        
        data={[ card.cardinSet.card.name, card.cardinSet.card.card_type, card.cardinSet.rarity, card.cardinSet.card.card_image,card.cardinSet.card_code,card.quantity, card.isFirstEd ? <CheckIcon/>:<CloseIcon/> ]} 
        
        button ={<Button 
            onClick={ () => 
            fetch(`/inventory/${user.id}/${card.card.id}`, {
                method: "PATCH",
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({quantity : newQuantity})
            })
            .then(console.log('done'))
            .then(console.log(card.card.id))
            .then((resp) => resp.json())
            .then((json) => console.log(json))
         }
         
         variant="outlined"
         size="small">
        <EditIcon/></Button>}

        deletebutton = {<Button  onClick={ () =>
    
            fetch(`/inventory/${user.id}/${card.card.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })}
        variant="outlined"
        size="small">
        <DeleteIcon color="primary"/></Button>} 
        />

    })  //()=>console.log(card.card.id)

    function handleSubmit(e){
       e.preventDefault()
       let card_name = e.target['card-name'].value
       let card_quantity = e.target['quantity'].value
       let isFirst = e.target[3].checked
       let card_id = e.target['set-id'].value
       
       //We will have to check if the key (card-id exists in our file to get the actual card_id. Lets assume that we have that and complete the post req)

       // Add client-side validation here
       // to check if the card exists when the post request is submitted only sucessfull response if 

       const newCard = {
        'quantity' : card_quantity,
        'isFirstEd' : isFirst,
        'user_id' : user.id,
        'card_id' : card_id
       }
       
       fetch(`inventory/${user.id}` , {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(newCard)
       })
       .then(resp => {
        if (resp.ok) {
            resp.json()
            .then((data => setCards([...cards,data])))
        }

        else{
            resp.json()
            .then(data => console.log(data))
        }
       }) 
        
    //     (resp.json()))
    //    .then(data => setCards([...cards,data]))
       
       //some kind of response that it was added sucessfully or not.


       //need a mapping of set id to card id

        //Onsubmit we need to: 
        //Validate that the card exists in database, validate the fields are all filled out, post request the card to db. 
    }

    return(
        <div className="componentdiv">
            <NavBar />
            <br></br>
            <Button onClick={() => console.log('hi')}>Test</Button>
            <form onSubmit={handleSearch} className="search">
                <input type="text" placeholder="Search..." />
                <button className="searchbutton" type="submit">Search</button>
            </form>
            <h1 className="header">Your Inventory</h1>

            <table className="tables">
                <tbody>
                <tr>
                    <th>Card Name</th>
                    <th>Card Type</th>
                    <th>Rarity</th>
                    <th>Image</th>
                    <th>Set-ID</th>
                    <th>Quantity</th>
                    <th>First Edition?</th>
                </tr>
                {renderRows}

                </tbody>

            </table>

            <h3 className="header">Add Card to Inventory</h3>
            <form  id = "New-CardinInventory-form" onSubmit={handleSubmit}>
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
                <label>
                    First Edition?
                    <input type="checkbox" name="firsted?" />
                </label>
                <button type="submit">Submit</button>
            </form>

            <br></br>
            <br></br>
            <h3>Enter New Quantity Below and Press Edit Quantity Button</h3>
        <input onChange={(e)=>setNewQuantity((newQuantity) => e.target.value)} type="integer" name="new-quantity" placeholder="Edit Quantity Here" />
        </div>
    )

}

//All the crud features on the inventory are available
//Need to add it so the user-id is passed in and not hard encoded
//Make it so the option to edit isnt on the click of edit but only to confirm. 

export default Inventory