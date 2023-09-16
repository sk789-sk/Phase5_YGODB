import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { Link } from "react-router-dom";
import { Button, Icon, IconButton, getStepContentUtilityClass } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PaginationBar from "./PaginationBar"
import Header from "./Header";

function Inventory({user}){
    //render States
    const [cards,setCards] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [cardsPerPage, setCardsPerPage] = useState(20)
    const [totalCards,setTotalCards] = useState(0)

    const [newQuantity,setNewQuantity] = useState(0)
    const [refresh,setRefresh] = useState(true)
    const [errorMessage,setErrorMessage] = useState('')
    const [isError,setIsError] = useState(false)
    const [path,setPath] = useState(`/inventory?${user.id}`)
    
    //Filter States
    const [filtertext,setFilterText] = useState('')

    
    useEffect( () => {
        fetch(`/inventory/${user.id}`) 
        .then((resp) => resp.json())
        .then ((data) =>(setCards(data.cards),setCurrentPage(data.page),setTotalPages(data.total_pages),setCardsPerPage(data.per_page),setTotalCards(data.total_items),setPath(`/inventory/${user.id}?`) ))
    },[refresh])
    

    //We need to make sure that the user has cards to render. If not we will get an error
    // what does setCards equal if there is nothing in the fetch?
      

    function handleSearch(e){
        e.preventDefault()

        console.log(e)
        let new_path = `/inventory/${user.id}?` 
        let form = document.getElementById("inventory-search-form")
        let inputs = form.querySelectorAll("input")

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value !== ""){
                new_path = new_path+`${inputs[i].dataset.key}=${inputs[i].value}&`
                console.log(new_path)
            }
        }

        console.log(new_path)

        fetch(new_path)
        .then(resp =>resp.json())
        .then ((data) =>(setCards(data.cards), setCurrentPage(data.page),setTotalPages(data.total_pages),setCardsPerPage(data.per_page),setTotalCards(data.total_items),setPath(new_path)))        
    }


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
        
    }


    //Render Functions
    const renderRows = cards.map( (card) => {
        
        return <TableRow  
        
        data={[ card.cardinSet.card.name, card.cardinSet.card.card_type, card.cardinSet.rarity,card.cardinSet.card_code,card.quantity, card.isFirstEd ? <CheckIcon/>:<CloseIcon/> ]} 
        
        button ={<Button 
            onClick={ () => 
            fetch(`/inventory/${user.id}/${card.cardinSet.id}`, {
                method: "PATCH",
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({quantity : newQuantity})
            })
            .then((resp) => resp.json())
            .then((json) => console.log(json))
            .then(setRefresh(!refresh))
         } //2 options i see, do something like toggle some dummy state to force a refresh, or directly edit the value in the array that is needed. I think a force refresh is better, but both options are shit but i havent really made any effort to keep track of whats what in the state array.
         
         variant="outlined"
         size="small">
        <EditIcon/></Button>}

        deletebutton = {<Button  onClick={ () =>
    
            fetch(`/inventory/${user.id}/${card.cardinSet.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.text())
        .then((data) => console.log(data + 'hi'))
        .then(setRefresh(!refresh))
    }
        variant="outlined"
        size="small">
        <DeleteIcon color="primary"/></Button>} 
        />

    })  //()=>console.log(card.card.id)

    const mst=['','Monster','Spell','Trap']

    const renderMST = mst.map((val) => {
        return <option value={val}>{val}</option>
    })

    const rarity=['','Common','Rare','Super Rare','Ultra Rare','Ultimate Rare','Secret Rare','Ghost Rare','Starlight Rare']

    const renderRarity = rarity.map((val) => {
        return <option value={val}>{val}</option>
    })

    const setCode = ['','LOB','MRD','TLM']

    const renderSetCode = setCode.map((val) => {
        return <option value={val}>{val}</option>
    })

    return(
        <div className="componentdiv">
            <Header />
            <br></br>

            <h1 className="header">Your Inventory</h1>
            
            <div className="main-content">
            <div className="Search-Filter">

            <form onSubmit={handleSearch} className="search" id="inventory-search-form">
                
                <input type="text" data-key="name" placeholder="Search by Name..." />

    
            
            
                <input type="search" placeholder="Search by Rarity" list="rarityList" data-key="rarity"/>
                <input type="search" placeholder="Search by Set" list="setList" data-key="card_code"/>
                <input type="search" placeholder="Card Type"  list="typeList" data-key="card_type"/>

                <Button className="searchbutton" type="submit"><SearchIcon size="small"/></Button>

            
            </form>
            
            <datalist id="typeList">
                {renderMST}
            </datalist>

            <datalist id="rarityList">
                {renderRarity}
            </datalist>
            
            <datalist id="setList">
                {renderSetCode}
            </datalist>

            {/* first ed toggle */}
            
            </div>
            
            <div className="pagination-wrapper">
                <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={totalPages} cardsPerPage = {cardsPerPage} totalCards={totalCards} setCards={setCards} path={path} />

            </div>
            <table className="tables">
                <tbody>
                <tr>
                    <th>Card Name</th>
                    <th>Card Type</th>
                    <th>Rarity</th>
                    <th>Set-ID</th>
                    <th>Quantity</th>
                    <th>First Edition?</th>
                </tr>
                {renderRows}

                </tbody>

            
            
            </table>

            <div className="add-Card-Bar">
            <h3 >Add Card to Inventory</h3>
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
            </div> 

            <br></br>
            <br></br>
            <h3>Enter New Quantity Below and Press Edit Quantity Button</h3>
        <input onChange={(e)=>setNewQuantity((newQuantity) => e.target.value)} type="integer" name="new-quantity" placeholder="Edit Quantity Here" />
        </div>
        </div>
    )

}

//All the crud features on the inventory are available
//Need to add it so the user-id is passed in and not hard encoded
//Make it so the option to edit isnt on the click of edit but only to confirm. 

export default Inventory