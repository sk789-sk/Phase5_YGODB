import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";

function Inventory(){

    const [cards,setCards] = useState([])

    const user_id = 2


    useEffect( () => {
        fetch(`/inventory/${user_id}`) 
        .then((resp) => resp.json())
        .then ((data) =>setCards(data))
    },[])

    console.log(cards)

    // 1.We fetch the data from the endpoint given a user id
    // 2. We populate that data into an array of cards that the user owns.
    // 3. Each card that the user owns has information that is passsed into a component that will return a single table row the data in <td> cells.
    // 4. Each Table Row will be placed into the table and rendered. 
    // cards.map((card) =>{
    //     console.log(card.card.name)
    //     console.log('test')
    // })
    
    const renderRows = cards.map( (card) => {
        return <TableRow data={[ card.card.name , card.card.card_type, card.card.rarity, card.card.card_image ,card.card.set_id,card.quantity]}/>
    })


    return(
        <div>
            <NavBar />
            <h1>data</h1>
            <table>
                <tbody>
                <tr>
                    <th>Card Name</th>
                    <th>Card Type</th>
                    <th>Rarity</th>
                    <th>Image</th>
                    <th>Set-ID</th>
                    <th>Quantity</th>
                </tr>
                {renderRows}
                </tbody>

            </table>
        </div>
    )

}

export default Inventory