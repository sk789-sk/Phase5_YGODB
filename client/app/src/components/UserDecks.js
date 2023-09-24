import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { Link } from "react-router-dom";
import TableRowLink from "./Tablerow_and_Link";
import TableRowEdit from "./TableRowLinkEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Checkbox } from "@mui/material";
import Header from "./Header";
import ReconTable from "./ReconcilTable";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';


import Error404 from "./Error404"
import Error401 from "./Error401"


function UserDecks ({user}) {
    //Load all the decks that a user has. Pass in the users id
    //We can use the same solution we had for the decks. 
    
    const [userDecks,setUserDecks] = useState([])
    const [filtertext,setFilterText] = useState('')
    const [refresh,setRefresh] = useState(true)
    const [selectAll,setSelectAll] = useState(true)
    const [showRecon,setShowRecon] = useState(false)
    const [reconVals,setReconVals] = useState([])

    useEffect( () => {
        fetch(`/Decks/${user.id}`)
        .then((resp) => {
            if (resp.ok){
                resp.json()
                .then((data) => (setUserDecks(data)))
            }
            else{
                resp.json()
                .then(data => console.log(data))
            }
        }
        )
        
    }, [refresh])

    console.log(userDecks)

    const filteredDecks = userDecks.filter((deck) => {
        return (deck.name.toLowerCase().includes(filtertext.toLowerCase()))
    })

    const renderDecks = filteredDecks.map( (deck) => {
        
        let totalCards=0
        for(let i=0; i<deck.card_in_deck.length;i++){
            totalCards = totalCards+ deck.card_in_deck[i].quantity
        }
        
        return <TableRow key={deck.id} 
        data = { [
            <Link to={`/UsersDecks/${deck.id}`}>{deck.name}</Link>, 
            totalCards,
            deck.created_at.split(' ')[0],
            <button value={deck.id} onClick={reconSingleDeck}>Reconcile Deck</button>,
            <input className="table-checkbox" data-id={deck.id} type="checkbox"></input>
        ]}

        id={deck.id} 
        
        deletebutton = {<Button onClick={ () =>
    
            fetch(`/Decks/${user.id}/${deck.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })}>
        <DeleteIcon/></Button>}
        
        //Pass in the Edit Button, Recon Button, CheckBox

        />
    })

    function handleSubmit(e){
        e.preventDefault()
        setFilterText((filtertext) => e.target[0].value)
    }

    function createDeck(e){
        e.preventDefault()
        let deckName = (e.target[0].value)
        console.log(user)

        const newDeck = {
            'user_id': user.id,
            'name': deckName,
            'isPublic': true
        }

        fetch(`/Decks/${user.id}`, {
            method: 'POST',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newDeck)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then((deck) => setUserDecks([...userDecks,deck]))
            }
        }
            )
    }

    function reconSingleDeck(e){
        console.log(e.target.value)
        fetch(`/InventRecon/${user.id}/${e.target.value}`)
        .then(resp => {
            if (resp.ok){
                resp.json()
                .then((data) => setReconVals(data),setShowRecon(true))
            }
            else{
                console.log('gasas')
            }
        })
    }

    function reconSelectDecks(){

        //Need to select the decks. 

        const checked_row = document.querySelectorAll('.table-checkbox:checked')
        console.log(checked_row)

        const arr_val = []
        
        //get the value of each checkbox

        checked_row.forEach(row => {
            console.log(row.getAttribute('data-id'))
            arr_val.push(row.getAttribute('data-id'))
        });

        console.log(arr_val)

        fetch(`/InventReconSomeDeck/${user.id}`, {
            method: 'POST',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(arr_val)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => setReconVals(data),setShowRecon(true))
            }
            else{
                console.log('hehe')
            }
        })
    }
    
    function selectAllDecks(){
        const rows = document.querySelectorAll('.table-checkbox')
        rows.forEach(row => {
            row.checked = true
        })
        setSelectAll(false)
    }

    function delesectAllDecks(){
        const rows = document.querySelectorAll('.table-checkbox')
        rows.forEach(row => {
            row.checked = false
        })
        setSelectAll(true)
    }

    return ( 
        <div className="componentdiv">
            <Header />
            <br></br>

            <h1 className="header">Your Decks</h1>
            <div className="main-body">

            <div className="Decks-main-content-div"> 
                <div className="Deck-table-div">
                    <div className="User-Decks-input-filters">

                        <form onSubmit={handleSubmit} className="search">
                            <input type="text" placeholder="Search by deck name " />
                            <Button className="searchbutton" type="submit"><SearchIcon/></Button>
                        </form>


                        <form onSubmit={createDeck} className="search">
                            <input type="text" placeholder= "Enter Deck Name" />
                            <Button className="confirm" type="submit"><AddIcon/></Button>   
                        </form>

                    </div>
                    <div className="Deck-table-buttons">
                            <div className="Deck-table">
                                <table className="tables">
                                    <thead>
                                        <tr>
                                            <th>Deck Name</th>
                                            <th>Card Count</th>
                                            <th>Creation Date</th>
                                            <th><button onClick={reconSelectDecks}>Reconcile Selected</button></th>
                                            <th>
                                                {selectAll ? <CheckIcon onClick={selectAllDecks} fontSize="small"/>: <CloseIcon onClick={delesectAllDecks} fontSize="small"/>}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderDecks}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                    <br></br>
                </div>
                {showRecon ? <ReconTable cardsNeeded={reconVals} setShowRecon={setShowRecon} /> : null}
            </div>
            
            <br></br>     
            </div>       
        </div>
        )
}

export default UserDecks