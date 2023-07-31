import React from "react";
import { Link } from "react-router-dom"

function NavBar(){
    return(
        <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/Cards">Cards</Link>
            <Link to = "/Inventory">Inventory</Link>
            <Link to = "/Login"> Login</Link>
        </nav>
    )
    }       
        
export default NavBar