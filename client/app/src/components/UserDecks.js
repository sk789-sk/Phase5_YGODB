import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { Link } from "react-router-dom";
import TableRowLink from "./Tablerow_and_Link";
import TableRowEdit from "./TableRowLinkEdit";

function UserDecks ({user}) {
    //Load all the decks that a user has. Pass in the users id
    //We can use the same solution we had for the decks. 

    const [userDecks,setUserDecks] = useState([])
    const [filtertext,setFilterText] = useState('')

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
        data = { [deck.name, deck.card_in_deck.length,deck.created_at]}
        id={deck.id} 
        
        deletebutton = {<button onClick={ () =>
    
            fetch(`/Decks/${user.id}/${deck.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })}>
        Delete</button>}
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
        <div>
            <NavBar />
            <form onSubmit={handleSubmit} className="search">
                <input type="text" placeholder="Search by deck name " />
                <button className="searchbutton" type="submit">Search</button>
            </form>

            <form onSubmit={createDeck} className="CreateForm">
                    <input type="text" placeholder= "Enter Deck Name" />
                    <button className="confirm" type="submit">Create New Deck</button>   
                </form>
            <h1>All the decks a single users has</h1>
            
            <table>
                <tbody>
                    <tr>
                        <th>Deck Name</th>
                        <th>Card Count</th>
                        <th>Creation Date</th>
                    </tr>
                    {renderDecks}
                </tbody>
            </table>
        </div>
        )
}

export default UserDecks