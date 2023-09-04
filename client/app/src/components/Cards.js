import React, { useEffect,useState } from "react";
import Button from '@mui/material/Button';
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import PaginationBar from "./PaginationBar";
import TableRowLink from "./Tablerow_and_Link";
import Header from "./Header";


function Cards(){ 
   
    const [cards,setCards] = useState([])
    const [filtertext,setFilterText] = useState('')
    const [cardtype,setCardType] = useState('')
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPage,setTotalPages] = useState(1)
    const [cardsPerPage,setCardsPerPage] = useState(20)
    const [totalCards,setTotalCards] = useState(0)
    // const [path,setPath] = useState(`/cards?search=${filtertext}&type=${cardtype}`)
    
    let path = `/cards?search=${filtertext}&type=${cardtype}`

    useEffect( () => {
        fetch('/cards')
        .then (resp => resp.json())
        .then ((data) =>(setCards(data.cards), setCurrentPage(data.page),setTotalPages(data.total_pages),setCardsPerPage(data.per_page),setTotalCards(data.total_items))) //data needs to be changed to just the cards in the response now and disregard the page totals
    },[])

    // const filteredcards = cards.filter(card => {
    //     return (card.name.toLowerCase().includes(filtertext.toLowerCase()))}
    //     )

   

    const renderRows = cards.map((card) => {
        return <TableRowLink data={[card.name,card.card_type,card.card_race,card.description]} id={card.id} path={`/Cards/`} />
    })


    function handleSubmit(e){
        e.preventDefault()
        console.log(e)

        setFilterText((filtertext) => e.target[0].value)
        

        fetch(`/cards?search=${filtertext}&type=${cardtype}`)
        .then(resp =>resp.json())
        .then ((data) =>(setCards(data.cards), setCurrentPage(data.page),setTotalPages(data.total_pages),setCardsPerPage(data.per_page),setTotalCards(data.total_items)))
    }

    function handleSelect(e){
        setCardType((cardtype) => e.target.value)
    }

    //Issue now is that the first time search is clicked there is a lag for between the state being updated and the data bieng fetched, 

    function handleTextChange(){}

    return(
        <div className="componentdiv">
            <Header/>
            <NavBar/>    
            <br></br>
            <div className="Search-Filter">
                <form onChange={handleTextChange} onSubmit={handleSubmit} className="search">
                    <input type="text" placeholder="Search..." />
                    <button className="searchbutton" type="submit">Search</button>
                </form>

                <select onChange={handleSelect} name="card-type">
                    <option value = "">All Cards</option>
                    <option value = "Monster">Monsters</option>
                    <option value = "Spell">Spell</option>
                    <option value = "Trap">Traps</option>                    
                </select>
            </div>

            <h1 className="header">Card Database</h1>
            <div className="pagination-wrapper"> 
            <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={totalPage} cardsPerPage={cardsPerPage} totalCards={totalCards} setCards={setCards} 
            path={path}/>
            </div>
            
            <table className="tables" id="card-table">
                <tbody>
                <tr>
                    <th>Card Name</th>
                    <th>Card Type</th>
                    <th>Attribute</th>
                    <th>Description/Effect</th>
                </tr>
                {renderRows}
                </tbody>

            </table>
            <Button variant="contained">Hello World</Button>
        </div>
    )}

//we fetch all the card information first and then filter in the front end for what to render. 
//We currently get all prints of the card as individual cards which we dont really want. what we want is 1 copy of a specific card. Filter so that we the render array does not have duplicate names
//Add the search option


export default Cards