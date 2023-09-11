import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { Link } from "react-router-dom";
import TableRowLink from "./Tablerow_and_Link";
import TableRowEdit from "./TableRowLinkEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Header from "./Header";

function UserDecks ({user}) {
    //Load all the decks that a user has. Pass in the users id
    //We can use the same solution we had for the decks. 

    const [userDecks,setUserDecks] = useState([])
    const [filtertext,setFilterText] = useState('')
    const [refresh,setRefresh] = useState(true)

    useEffect( () => {
        fetch(`/Decks/${user.id}`)
        .then((resp) => resp.json())
        .then ((data) => setUserDecks(data))
    }, [])

    console.log(user)

    const filteredDecks = userDecks.filter((deck) => {
        return (deck.name.toLowerCase().includes(filtertext.toLowerCase()))
    })

    const renderDecks = filteredDecks.map( (deck) => {
        return <TableRowEdit key={deck.id} 
        data = { [deck.name, deck.card_in_deck.length,deck.created_at.split(' ')[0]]}
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

    return ( 
        <div className="componentdiv">
            <Header />
            <br></br>
            <form onSubmit={handleSubmit} className="search">
                <input type="text" placeholder="Search by deck name " />
                <button className="searchbutton" type="submit">Search</button>
            </form>

            <h1 className="header">Your Decks</h1>
            
            <table className="tables">
                <tbody>
                    <tr>
                        <th>Deck Name</th>
                        <th>Card Count</th>
                        <th>Creation Date</th>
                    </tr>
                    {renderDecks}
                </tbody>
            </table>
            <br></br>

            <h3 className="header">Create a New Deck</h3>
            <form onSubmit={createDeck} className="CreateForm">
                    <input type="text" placeholder= "Enter Deck Name" />
                    <button className="confirm" type="submit">Create New Deck</button>   
                </form>
        </div>
        )
}

export default UserDecks