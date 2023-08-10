import React from "react";
import { Link } from "react-router-dom"

function NavBar(){
    return(
        <nav className="main-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Cards">Cards</Link></li>
            <li><Link to = "/Inventory">Inventory</Link></li>     
            <li><Link to = "/Decks">Decks</Link></li>
            <li><Link to = "/Sets">Sets</Link></li>
            <li><Link to = "/UsersDecks">Your Decks</Link></li>
            <li><Link to = '/UserProfile'>Your Profile</Link></li>
            <li><Link to = "/Login"> Login</Link></li>
        </nav>
    )
    }       
        
export default NavBar