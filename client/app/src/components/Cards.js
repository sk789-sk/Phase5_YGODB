import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";


function Cards(){ //will need a way to set the filter always
   //When we submit the search bar we set set the filter value to what is in the submission field. I think this is better than searching continously 
   
    function handleChange(){}
    function handleSubmit(){}

    const [cards,setCards] = useState([])


    useEffect( () => {
        fetch('/cards')
        .then (resp => resp.json())
        .then ((data) =>setCards(data))
    },[])

    console.log(cards)

    const renderRows = cards.map((card) => {
        return <TableRow data={[card.name,card.card_type,card.card_race,card.LegalDate,card.card_image]} />
    })


    return(
        <div>
            <NavBar/>    
            <form onSubmit={handleSubmit} className="search-bar">
                <input onChange ={handleChange} type="text" placeholder="Search..." />
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

export default Cards