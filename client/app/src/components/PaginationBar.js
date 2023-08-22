import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { Link } from "react-router-dom";
import TableRowLink from "./Tablerow_and_Link";
import TableRowEdit from "./TableRowLinkEdit";

function PaginationBar (){

    //The bar would need to know what the current page is  
    const [currentPage,setCurrentPage] = useState(1)
    const lastPage = 100
    const totalCards = 100
    const cardsPerPage = 20

    //7 buttons 2 past page 2 forward page 1 previous page 1 next page 1 first page 1 last page
    //1 "button" for the current page

    function handleClick(e){
        console.log(e.target.value)

        const offset = parseInt(e.target.value)

        let newPage = currentPage + offset
        console.log(currentPage)
        console.log(offset)
        console.log(newPage)

        setCurrentPage(newPage)
        //When we click on the button, we get the page value listed on the button
        //We then reset the rendered cards with the apppropriate data from the api call
        //We update the pagination bar values
    }

    return(
        <div className="pagination-bar">
            <p>pagination part</p>

            <button disabled={currentPage===1} onClick={handleClick} value={1-currentPage}>First </button>

            <button disabled= {currentPage===1} onClick={handleClick} value={-1}>Previous</button>
            
            <button disabled= {(currentPage-2) <1} onClick={handleClick} hidden={(currentPage-2) <1} value={-2}>{currentPage-2}</button>
            <button disabled= {(currentPage-1) <1} onClick={handleClick} hidden={(currentPage-1) <1} value={-1}>{currentPage-1} </button>
            
            <button>{currentPage}</button>
            
            <button disabled= {(currentPage+1) > lastPage} onClick={handleClick} hidden={(currentPage+1) > lastPage} value={1}>{currentPage+1} </button>
            <button disabled= {(currentPage+2) > lastPage} onClick={handleClick} hidden={(currentPage+2) > lastPage} value ={2}> {currentPage+2} </button>
            
            <button disabled= {(currentPage+1>lastPage)} onClick={handleClick} value={1}>Next </button>
            
            <button disabled={currentPage===lastPage} onClick={handleClick} value={lastPage-currentPage}>Last </button>

            <p>Page {currentPage} of {lastPage}</p>
            <p>Results: {(currentPage*cardsPerPage)-20}-{ totalCards >=currentPage*cardsPerPage? (currentPage*cardsPerPage):totalCards} of {totalCards}</p>

        </div>
    )
}

export default PaginationBar