import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";

function SingleSet() {

    const [setData,setSetData] = useState([])
    const [filtertext,setFilterText] = useState('')

    const params = useParams();
    console.log(params.id)
    console.log('hello')

    useEffect( () => {
        fetch(`/Sets/${params.id}`)
        .then((resp) => resp.json())
        .then((data) => setSetData(data))
    }, [])

    const filteredcards = setData.filter( (card) => {
        return(card.card.name.toLowerCase().includes(filtertext.toLowerCase())
        || card.rarity.toLowerCase().includes(filtertext.toLowerCase()))
    })

    //some duplicates in db?

    const renderCards = filteredcards.map ((card) => {
        return <TableRow key={card.card_code} 
        data = {[<Link to={`/Cards/${card.card_id}`}> {card.card.name} </Link>,
             card.rarity, 
             card.card_code,
            <img className="tableImage" src={card.card.card_image} width="100%" height="100%"/>]} />
    })

    function handleSubmit(e){
        e.preventDefault()
        setFilterText((filtertext) => e.target[0].value)
    }

    return (
        <div>
            <Header />
            <h3>set information</h3>
            <form onSubmit={handleSubmit} className="Deck-search-bar">
                <input type="text" placeholder="Search by card name or rarity" />
                <button type="submit">Search</button>
            </form>
            <table className="tabletest">
                <tbody>
                    <tr>
                        <th>Card Name</th>
                        <th>Card Rarity</th>
                        <th>Card id</th>
                    </tr>
                    {renderCards}
                </tbody>
            </table>


        </div>
    )
}

export default SingleSet