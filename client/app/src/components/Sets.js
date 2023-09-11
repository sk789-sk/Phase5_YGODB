import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { Link } from "react-router-dom";
import Header from "./Header";


function Sets() {

    const [releasedSets,setReleasedSets] = useState ([])
    const [filtertext,setFilterText] = useState('')

    useEffect ( () => {
        fetch(`/Sets`)
        .then((resp) => resp.json())
        .then((data) => setReleasedSets(data))
    },[])

    // console.log(releasedSets)

    const filteredSets = releasedSets.filter( (singleSet) => {
        return (singleSet.name.toLowerCase().includes(filtertext.toLowerCase()) 
                )
    }) 



    const renderSets = filteredSets.map( (singleSet) => {
        return <TableRow key={singleSet.includes} 
        data = { [<Link to={`/Sets/${singleSet.id}`}> {singleSet.name} </Link>, 
            singleSet.set_code, 
            singleSet.card_count, 
            singleSet.releaseDate]} />
    })



    function handleSubmit(e){
        e.preventDefault()
        setFilterText((filtertext) => e.target[0].value)
    }
    
    return(
        <div className="componentdiv">
            <Header />
            <br></br>
            <form onSubmit={handleSubmit} className="search">
                <input type="text" placeholder="Search by Set Name" />
                <button className="searchbutton" type="submit">Search</button>
            </form>
            <h1 className="header">All Sets Released in the TCG</h1>
            <table className="tables">
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