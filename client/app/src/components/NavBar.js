import React from "react";
import { Link } from "react-router-dom"
import logo from "../card_images/Card-Image.png"

function NavBar(){
    return(
        <nav className="main-nav">
            <ul className="navbar">
            <li className="nav-element">
                <Link to="/">
                    <span className="material-symbols-outlined">Home</span>
                    <span className="nav-text">Home</span>
                </Link>
            
            </li>
            
            <li className="nav-element">
                <Link to="/Cards">
                <span className="material-symbols-outlined">playing_cards</span>
                <span className="nav-text">Cards</span>
                </Link>
            </li>
            
            <li className="nav-element">
                <Link to = "/Inventory">
                <span className="material-symbols-outlined">inventory_2</span>
                <span className="nav-text">Inventory</span>
                </Link>
            </li>     
            
            <li className="nav-element">
                <Link to = "/Decks">
                <span className="material-symbols-outlined">folder</span>
                <span className="nav-text">Decks</span>

                </Link>
            </li>
            
            <li className="nav-element">
                <Link to = "/Sets">
                <span className="material-symbols-outlined">query_stats</span>
                <span className="nav-text">Sets</span>
                </Link>
            </li>
            
            <li className="nav-element">
                <Link to = "/UsersDecks">
                <span className="material-symbols-outlined">folder_open</span>
                <span className="nav-text">Your Decks</span>
                </Link>
            </li>

            <li className="nav-element">
                <Link to = '/UserProfile'>
                <span className="material-symbols-outlined">account_circle</span>
                <span className="nav-text">Your Profile</span>
                </Link>
            </li>
            
            <li className="nav-element">
                <Link to = "/Login"> 
                <span className="material-symbols-outlined">login</span>
                <span className="nav-text">Login</span>

                </Link>
            </li>
            </ul>
        </nav>
    )
    }       
        
export default NavBar



