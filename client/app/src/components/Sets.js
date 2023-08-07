import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";


function Sets() {

    const [releasedSets,setReleasedSets] = useState ([])
    const [filtertext,setFilterText] = useState('')

    useEffect ( () => {
        fetch(`/Sets`)
        .then((resp) => resp.json())
        .then((data) => setReleasedSets(data))
    },[])

    const filteredSets = releasedSets.filter( (singleSet) => {
        return (singleSet.name.toLowerCase().includes(filtertext.toLowerCase()) )
    }) 


    const renderSets = filteredSets.map( (singleSet) => {
        return <TableRow key={singleSet.includes} 
        data = { [singleSet.name, singleSet.set_code, singleSet.card_count, singleSet.releaseDate]} />
    })

    function handleSubmit(e){
        e.preventDefault()
        setFilterText((filtertext) => e.target[0].value)
    }
    
    return(
        <div>
            <NavBar />
            <form onSubmit={handleSubmit} className="Deck-search-bar">
                <input type="text" placeholder="Search by deck name or username" />
                <button type="submit">Search</button>
            </form>
            <h1 >DeckTest</h1>
            <h1>Search Bar and Filter</h1>
            <table>
                <tbody>
                <tr>
                    <th>Set Name</th>
                    <th>Set Code</th>
                    <th>Card Count</th>
                    <th>Release Date</th>
                </tr>
                {renderSets}

                </tbody>

            </table>
        </div>
    )

}

export default Sets