import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import PaginationBar from "./PaginationBar";


function Cards(){ 
   
    const [cards,setCards] = useState([])
    const [filtertext,setFilterText] = useState('')
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPage,setTotalPages] = useState(1)
    const [cardsPerPage,setCardsPerPage] = useState(20)
    const [totalCards,setTotalCards] = useState(0)

    useEffect( () => {
        fetch('/cards')
        .then (resp => resp.json())
        .then ((data) =>(setCards(data.cards), setCurrentPage(data.page),setTotalPages(data.total_pages),setCardsPerPage(data.per_page,setTotalCards(data.total_items)))) //data needs to be changed to just the cards in the response now and disregard the page totals
    },[])

    const filteredcards = cards.filter(card => {
        return (card.name.toLowerCase().includes(filtertext.toLowerCase()))}
        )

    const renderRows = filteredcards.map((card) => {
        return <TableRow data={[card.name,card.card_type,card.rarity,card.card_race,card.set_id,card.description]} />
    })


    function handleSubmit(e){
        e.preventDefault()
        setFilterText((filtertext) => e.target[0].value)
    }

    return(
        <div className="componentdiv">
            <NavBar/>    
            <br></br>
            <form onSubmit={handleSubmit} className="search">
                <input type="text" placeholder="Search..." />
                <button className="searchbutton" type="submit">Search</button>
            </form>

            <h1 className="header">Card Database</h1>
            <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={totalPage} cardsPerPage={cardsPerPage} totalCards={totalCards} setCards={setCards} path={'/cards'}/>
            <table className="tables">
                <tbody>
                <tr>
                    <th>Card Name</th>
                    <th>Card Type</th>
                    <th>Rarity</th>
                    <th>Attribute</th>
                    <th>Set-ID</th>
                    <th>Description/Effect</th>
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