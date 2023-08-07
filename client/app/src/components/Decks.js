import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";

function Decks () {

    //Load all decks that are available

    const [decks,setDecks] = useState([])
    const [filtertext,setFilterText] = useState('')


    useEffect( () => {
        fetch(`/Decks`) 
        .then((resp) => resp.json())
        .then ((data) =>setDecks(data))
    },[])

    const publicDecks = decks.filter((deck) => {
      return (deck.isPublic == null)  
    })

    const renderDecks = publicDecks.filter((deck) => {
        console.log(deck.name)
        return (deck.name.toLowerCase().includes(filtertext.toLowerCase()) || deck.user.username.toLowerCase().includes(filtertext.toLowerCase()))
    })

    const renderRows = renderDecks.map((deck) => {
        return <TableRow key={deck.id} 
        
        data={ [deck.name, deck.user.username , deck.card_in_deck.length, 44, deck.created_at]  }
        />
    })

    function handleSubmit(e){
        e.preventDefault()
        console.log('hi')
        setFilterText((filtertext) => e.target[0].value)
    }

    return(
        <div>
            <NavBar />
            <form onSubmit={handleSubmit} className="Deck-search-bar">
                <input type="text" placeholder="Search by deck name or username" />
                <button type="submit">Search</button>
            </form>
            <h1 >DeckTest</h1>
            <h1>Search Bar and Filter</h1>
            <h3>Create a New Deck Link</h3>
            <table>
                <tbody>
                <tr>
                    <th>Deck Name</th>
                    <th>Creator</th>
                    <th>Card Count</th>
                    <th>M/S/T</th>
                    <th>Creation Date</th>
                </tr>
                {renderRows}

                </tbody>

            </table>
        </div>
    )
}

export default Decks