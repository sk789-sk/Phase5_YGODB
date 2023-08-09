import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";

function UserDecks ({user}) {
    //Load all the decks that a user has. Pass in the users id

    console.log(user)

    const userid = 2
    const [userDecks,setUserDecks] = useState([])
    const [filtertext,setFilterText] = useState('')

    useEffect( () => {
        fetch(`/Decks/${user.id}`)
        .then((resp) => resp.json())
        .then ((data) => setUserDecks(data))
    }, [])

    console.log(userDecks)

    const filteredDecks = userDecks.filter((deck) => {
        return (deck.name.toLowerCase().includes(filtertext.toLowerCase()))
    })

    const renderDecks = filteredDecks.map( (deck) => {
        return <TableRow key={deck.id} 
        data = { [deck.name, deck.card_in_deck.length, 44, deck.created_at]} />
    })

    function handleSubmit(e){
        e.preventDefault()
        setFilterText((filtertext) => e.target[0].value)
    }

    return ( 
        <div>
            <NavBar />
            <form onSubmit={handleSubmit} className="Search-Bar">
                <input type="text" placeholder="Search by deck name " />
                <button type="submit">Search</button>
            </form>
            <h1>All the decks a single users has</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Deck Name</th>
                        <th>Card Count</th>
                        <th>M/S/T</th>
                        <th>Creation Date</th>
                    </tr>
                    {renderDecks}
                </tbody>
            </table>
        </div>
        )
}

export default UserDecks