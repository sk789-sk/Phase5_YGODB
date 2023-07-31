import React from "react";
import NavBar from "./NavBar";

function Cards({setFilter}){ //will need a way to set the filter always
   //When we submit the search bar we set set the filter value to what is in the submission field. I think this is better than searching continously 
   
    function handleChange(){}
    function handleSubmit(){}



    return(
        <div>
            <NavBar/>    
            <form onSubmit={handleSubmit} className="search-bar">
                <input onChange ={handleChange} type="text" placeholder="Search..." />
                <button type="submit">Search</button>

            </form>
        </div>
    )}

export default Cards