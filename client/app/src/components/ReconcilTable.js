import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"
import TableRow from "./Tablerow";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';




function ReconTable({cardsNeeded,setShowRecon}){

    //This table wants to figure out what cards you have in your decks and what cards you have in your inventories and the difference between them. 
    //we will have less cards in deck then cards we own on average so lets make the list of cards by going through the deck. 
    //Take a deck, take the cards in the deck and the quantities and add it to the table. We want to know what deck the card is used in as well. 
    //A deck belongs to a user and is a list of cards
    //If we load all the decks a user has we have a list of cards
    //An inventory is a list of cardsinSets (aka physical card)
    //Each physical card references a single card_id, which is a card. So we can take someones inventory and extend it to show the card_id. To see if a user has a copy of a card we have to scan the entire inventory, This is basically a see if a value exists in an array, but the array has no sorting or etc. We could use a hash to just see the values right away. We still need to compile a map of the users inventory and users decks. 
    // just to have it done, we take the users inventory turn cardInset into the card_id and then multiple the quantity to see how many copies of a card we have. ex 3 pot of greed.
    //We map these values into a map and keep that as your simple inventory. 
    //We then do the same thing to cards in decks. See what deck id a user has, and then get the card_id and quantity of those. We turn that into a map and we now can compare the values. If it exists we compare and put value in reccon table. if not we add the value to recon table and display. 
    //would probably be better to just do this on the backend,
    //We can take the deck a user
    //get card cound from users decks
    //Lets create our object with card_id and the quantities needed.
    // now we need to send this information to the backend, we have card_id and quantity and compare this to the inventory
    //onClick of the button we create the table
    //need a function that takes an string input. then goes through the object array and for each one it retuns a <p>text<p><br><br>
    
    // Moved all logic to backend and fetch to in parent component. This will just receive the information and render it
    
    const [searchBy,setSearchBy] = useState('')
    const [page_num,setPageNum] = useState(0)
    const path = `/Cards/`

    const filteredCards = cardsNeeded.filter((card) =>{
       return (card.name.toLowerCase().includes(searchBy.toLowerCase()))
    }
    )

    const per_page = 15
    const max_page = Math.ceil((filteredCards.length)/(per_page))

    // console.log(filteredCards)

    function findClass(obj) {
        if (obj.need === 0){
            return 'row-green'
        }
        
        let min_for_any = 0
        obj['usage'].map(val => {
            if (parseInt(val[0])>min_for_any){
                min_for_any=parseInt(val[0])
            }
        })

        if (obj.owned >= min_for_any){
            return 'row-yellow'
        }

        if (obj.owned < min_for_any){
            return 'row-red'
        }

        return 'placeholder'

    }

    const renderRows = filteredCards.slice(0+(per_page*page_num),19+(per_page*page_num)).map( (val) => {
    
        // console.log(cardsperDeck[val.name])

        //for renderRows here we can add the color 

        

        return (
            <tr className={findClass(val)}>
                <td>
                    <Link to={`${path}${val.id}`}> {val.name} </Link>
                </td>
                <td>{val.owned}</td>
                <td>{val.required}</td>
                <td>{val.need}</td>
                <td>
                    <ul>
                        {val['usage'].map((value,idx) => {
                            return (<li className="uncenter" key={idx}>{value}</li> )
                        })}
                    </ul>
                </td>
            </tr>
        )
    } 
     )

     function handleSubmit(e){
        e.preventDefault()
        setSearchBy((searchBy) => e.target[0].value)
        console.log('hi')
        console.log(e.target[0].value)
     }

     function handleClick(e){
        // console.log(e.currentTarget.value)
        console.log(page_num)
        setPageNum((page_num + parseInt(e.currentTarget.value)))
     }

     function close(){
        setShowRecon(false)
     }



    return (


        <div> 
            <div className="Deck-table-div">
                <div className="User-Decks-input-filters">

                    <form onSubmit={handleSubmit} className="search">
                            <input type="text" placeholder="Search by Card name " />
                            <Button type="submit"><SearchIcon/></Button>
                    </form>
                    
                    <p>{(page_num+1)*per_page-14} - {(page_num+1)*per_page >= filteredCards.length ? filteredCards.length:(page_num+1)*per_page} of {filteredCards.length}</p>

                    <div className="pagination-controls">
                        <button onClick={handleClick} disabled={page_num===0} value={0-page_num} > <FirstPageIcon/> </button>
                        <button onClick={handleClick} disabled={page_num===0} value={-1} ><NavigateBeforeIcon/> </button>
                        <button><b>{page_num +1}</b></button>
                        <button onClick={handleClick} disabled={page_num+1 >= max_page} value={1} ><NavigateNextIcon/></button>
                        <button onClick={handleClick} disabled={page_num+1 >= max_page} value={max_page-page_num-1}><LastPageIcon/></button>

                    </div>

                    <CloseIcon onClick={close}/>

                </div>
                <div className="Deck-table-buttons">
                    <table className="tables">
                        <thead>
                            <tr>
                                <th>Card Name</th>
                                <th>Owned</th>
                                <th>Required</th>
                                <th>Needed</th>
                                <th>Usage Breakdown</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows}
                        </tbody>
                    </table>
                </div>
                <br></br>
            </div>
        </div>
    )
}

export default ReconTable