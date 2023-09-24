import React, { useEffect,useState } from "react";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';

function PaginationBar ({currentPage,setCurrentPage,lastPage,cardsPerPage,totalCards,setCards, path}){
    //7 buttons 2 past page 2 forward page 1 previous page 1 next page 1 first page 1 last page
    //1 "button" for the current page

    // console.log('current page is ' + currentPage)
    // console.log('last page is ' + lastPage)
    // console.log('total cards is ' + totalCards)

    function handleClick(e){
        console.log(path)
        console.log(currentPage)

        console.log(e.currentTarget.value)
        console.log(e.target.value)
        
        const offset = parseInt(e.currentTarget.value)
                
        let newPage = currentPage + offset      
        
        if (newPage !== currentPage){
            fetch(`${path}&page=${newPage}`) //find better solution for this, this would break if there are no url parameters in query. could have all the urls end in ? not sure if ?& is valid syntax. checked and it is, this is fine then have all the paths end in ?. ??$ is also valid. ?searchterm?$ is invalid. We will follow that all paths end in ?  
            .then(resp => resp.json())
            .then((data) => (setCards(data.cards)))
        }
        setCurrentPage(newPage)
        //When we click on the button, we get the page value listed on the button
        //We then reset the rendered cards with the apppropriate data from the api call
        //We update the pagination bar values
    }

    return(
        <div className="pagination-results">
            <h4 className="PageInfo">Page: {currentPage} of {lastPage}</h4>

            <div className="pagination-controls">
                <button disabled={currentPage===1} onClick={handleClick} value={1-currentPage}><FirstPageIcon/> </button>
                <button disabled= {currentPage===1} onClick={handleClick} value={-1}><NavigateBeforeIcon/></button>
                <button disabled= {(currentPage-2) <1} onClick={handleClick} hidden={(currentPage-2) <1} value={-2}>{currentPage-2}</button>
                <button disabled= {(currentPage-1) <1} onClick={handleClick} hidden={(currentPage-1) <1} value={-1}>{currentPage-1} </button>
                <button>{currentPage}</button>
                <button disabled= {(currentPage+1) > lastPage} onClick={handleClick} hidden={(currentPage+1) > lastPage} value={1}>{currentPage+1} </button>
                <button disabled= {(currentPage+2) > lastPage} onClick={handleClick} hidden={(currentPage+2) > lastPage} value ={2}> {currentPage+2} </button>
                <button disabled= {(currentPage+1>lastPage)} onClick={handleClick} value={1}><NavigateNextIcon/> </button>
                <button disabled={currentPage===lastPage} onClick={handleClick} value={lastPage-currentPage}><LastPageIcon/> </button>
            </div>
            <h4 className="ResultInfo">Showing: {(currentPage*cardsPerPage)-19}-{ totalCards >=currentPage*cardsPerPage? (currentPage*cardsPerPage):totalCards} of {totalCards}</h4>

        </div>
    )
}

export default PaginationBar