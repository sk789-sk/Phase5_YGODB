import React, { useEffect,useState } from "react";
import Button from '@mui/material/Button';
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import CardTableRow from "./CardTableRow";
import PaginationBar from "./PaginationBar";
import TableRowLink from "./Tablerow_and_Link";
import Header from "./Header";
import { Container, InputLabel, MenuItem, Select, Stack, Table, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';




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
        .then ((data) =>(setCards(data.cards), setCurrentPage(data.page),setTotalPages(data.total_pages),setCardsPerPage(data.per_page),setTotalCards(data.total_items))) 
    },[])
   
    //Render Elements

    // for (let card in cards){
    //     console.log(cards[card])
    // }

    const renderRows = cards.map((card) => {
        return <TableRowLink data={[card.name,card.card_type,card.card_race,card.description]} id={card.id} path={`/Cards/`} />
    })

    const mst = ['',"Monster","Spell","Trap"]
    const renderMSt = mst.map((val) => {
        return <option value={val}>{val}</option>
    })

    const attributes = ['','Water', 'Earth', 'Fire', 'Light', 'Dark', 'Wind', 'Divine']
    
    const renderAttributes = attributes.map((attribute) => {
        return <option value={attribute}>{attribute}</option>
    })

    const card_race = ['','Fish','Machine','Fairy']

    const renderRace = card_race.map((race) => {
        return <option value={race}>{race}</option>
    })

    const renderRowTest = cards.map((card) => {
        return <CardTableRow data = {card} path={`/Cards/`} />
    })


    //Functional Elements

    function handleSubmit(e){

        e.preventDefault()
        console.log(e)
        
        console.log(e.target[0].value)
        console.log(cardtype)
        setFilterText((filtertext) => e.target[0].value)

        fetch(`/cards?search=${filtertext}&type=${cardtype}`)
        .then(resp =>resp.json())
        .then ((data) =>(setCards(data.cards), setCurrentPage(data.page),setTotalPages(data.total_pages),setCardsPerPage(data.per_page),setTotalCards(data.total_items)))
    }

    function handleSelect(e){
        console.log(e.target.value)
        setCardType((cardtype) => e.target.value)
    }

    //Issue now is that the first time search is clicked there is a lag for between the state being updated and the data bieng fetched, 

    function handleTextChange(){}

    return(
        <div className="componentdiv">
            <Header/>
            <NavBar/>    

            <br></br>
            
            <h1 className="header">Card Database</h1>
            
            
            <Stack direction="row">
            <div className="Search-Filter">
                <form onChange={handleTextChange} onSubmit={handleSubmit} className="search">
                    <TextField type="text" name="search-txt" placeholder="Search..." variant="outlined" color="primary" size="small" fullWidth>
                    </TextField>
                    <Button className="searchbutton" type="submit"><SearchIcon size="small"/></Button>
                



                <input onChange={handleSelect} type="search" name="card-type" list="typeList" placeholder="Search by Card Type" /> 

                <input type="search" name='monster-attribute' list="attributeList" placeholder="Search by Card Attribute" />

                <input type="search" name="card-race" list="raceList" placeholder="CardRace"/>

                <input type="search" name="card-alt-spec" list="altList" />
                </form>
            </div>
            </Stack>

            <datalist id="typeList">
                {renderMSt}
            </datalist>
            <datalist id="attributeList">
                {renderAttributes}
            </datalist>
            <datalist id="raceList">
                {renderRace}
            </datalist>
            <datalist id="altList">

            </datalist>

            <button>Show Advanced Filter</button>
            
            <div className="pagination-wrapper"> 
                <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={totalPage} cardsPerPage={cardsPerPage} totalCards={totalCards} setCards={setCards} 
                path={path}/>
            </div>
            

            <table className="tabletest">
                <tbody>
                    {renderRowTest}
                </tbody>
            </table>


            {/* <table className="tables" id="card-table">
                <tbody>
                <tr>
                    <th>Card Name</th>
                    <th>Card Type</th>
                    <th>Attribute</th>
                    <th>Description/Effect</th>
                </tr>
                {renderRows}
                </tbody>

            </table> */}
        </div>
    )}

//we fetch all the card information first and then filter in the front end for what to render. 
//We currently get all prints of the card as individual cards which we dont really want. what we want is 1 copy of a specific card. Filter so that we the render array does not have duplicate names
//Add the search option


export default Cards