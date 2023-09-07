import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import TableRowLink from "./Tablerow_and_Link";
import SingleDeck from "./SingleDeckView";
import { Routes, Route, useMatch } from "react-router-dom";

function Decks () {

    //Load all decks that are available

    const [decks,setDecks] = useState([])
    const [filtertext,setFilterText] = useState('')

    // const match = useMatch();
    // console.log(match)

    useEffect( () => {
        fetch(`/Decks`) 
        .then((resp) => resp.json())
        .then ((data) =>setDecks(data))
    },[])

    const publicDecks = decks.filter((deck) => {
      return (deck.isPublic == true)  
    })

    const renderDecks = publicDecks.filter((deck) => {
        // console.log(deck.created_at.split(' ')[0])
        return (deck.name.toLowerCase().includes(filtertext.toLowerCase()) || deck.user.username.toLowerCase().includes(filtertext.toLowerCase()))
    })

    const renderRows = renderDecks.map((deck) => {
        // console.log(deck.created_at.split(' ')[0])
        return <TableRowLink key={deck.id} 
        
        data={ [deck.name, deck.user.username , deck.card_in_deck.length, deck.created_at.split(' ')[0]]  }
        id={deck.id} path={`/Decks/`}
        />
    })

    function handleSubmit(e){
        e.preventDefault()
        console.log('hi')
        setFilterText((filtertext) => e.target[0].value)
    }

    return(
        <div className="componentdiv">
            <NavBar />
            <br></br>
            <form onSubmit={handleSubmit} className="search">
                <input type="text" placeholder="Search by deck name or username" />
                <button className="searchbutton" type="submit">Search</button>
            </form>
            <h1 className="header">Publicly Available Decks</h1>
            <table className="tables">
                <tbody>
                <tr>
                    <th>Deck Name</th>
                    <th>Creator</th>
                    <th>Card Count</th>
                    <th>Creation Date</th>
                </tr>
                {renderRows}

                </tbody>
            </table>
        </div>
    )
}

export default Decks