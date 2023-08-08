import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import SingleDeck from "./SingleDeckView";

function SingleUsersDeck(id) {
    //This is basically a single user deck but the user has edit options
    //The runtime error in the singleDeck extend here



    return(
        <div>
            <NavBar/>
            <SingleDeck />

            <form>
                <input type="text" placeholder="Edit Name" />
                <button type="submit">Confirm</button>
            </form>
        </div>
    )
}

export default SingleUsersDeck