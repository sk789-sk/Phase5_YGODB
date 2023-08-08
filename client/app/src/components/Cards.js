import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";


function Cards(){ 
   
    const [cards,setCards] = useState([])
    const [filtertext,setFilterText] = useState('')

    useEffect( () => {
        fetch('/cards')
        .then (resp => resp.json())
        .then ((data) =>setCards(data))
    },[])

    console.log(cards)

    const filteredcards = cards.filter(card => {
        return (card.name.toLowerCase().includes(filtertext.toLowerCase()))}
        )

    const renderRows = filteredcards.map((card) => {
        return <TableRow data={[card.name,card.card_type,card.card_race,card.LegalDate,card.card_image]} />
    })


    function handleSubmit(e){
        e.preventDefault()
        setFilterText((filtertext) => e.target[0].value)
    }

    return(
        <div>
            <NavBar/>    
            <form onSubmit={handleSubmit} className="search-bar">
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </form>

            <h1>Search Bar and Filter</h1>
            <table>
                <tbody>
                <tr>
                    <th>Card Name</th>
                    <th>Card Type</th>
                    <th>Rarity</th>
                    <th>Image</th>
                    <th>Set-ID</th>
                    <th>Number of Prints</th>
                </tr>
                {renderRows}
                </tbody>

            </table>


        </div>
    )}

//we fetch all the card information first and then filter in the front end for what to render. 
//We currently get all prints of the card as individual cards which we dont really want. what we want is 1 copy of a specific card. Filter so that we the render array does not have duplicate names
//Add the search option


export default Cards