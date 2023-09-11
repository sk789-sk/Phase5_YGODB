import React from "react";
import { Link } from "react-router-dom"
import logo from "../card_images/Card-Image.png"

function NavBar(){
    return(
        <nav className="main-nav">
            <ul className="navbar">
            <li className="nav-element">
                <Link to="/">
                    <span class="material-symbols-outlined">Home</span>
                    <span class="nav-text">Home</span>
                </Link>
            
            </li>
            
            <li className="nav-element">
                <Link to="/Cards">
                <span class="material-symbols-outlined">playing_cards</span>
                <span class="nav-text">Cards</span>
                </Link>
            </li>
            
            <li className="nav-element">
                <Link to = "/Inventory">
                <span class="material-symbols-outlined">inventory_2</span>
                <span class="nav-text">Inventory</span>
                </Link>
            </li>     
            
            <li className="nav-element">
                <Link to = "/Decks">
                <span class="material-symbols-outlined">folder</span>
                <span class="nav-text">Decks</span>

                </Link>
            </li>
            
            <li className="nav-element">
                <Link to = "/Sets">
                <span class="material-symbols-outlined">query_stats</span>
                <span class="nav-text">Sets</span>
                </Link>
            </li>
            
            <li className="nav-element">
                <Link to = "/UsersDecks">
                <span class="material-symbols-outlined">folder_open</span>
                <span class="nav-text">Your Decks</span>
                </Link>
            </li>

            <li className="nav-element">
                <Link to = '/UserProfile'>
                <span class="material-symbols-outlined">account_circle</span>
                <span class="nav-text">Your Profile</span>
                </Link>
            </li>
            
            <li className="nav-element">
                <Link to = "/Login"> 
                <span class="material-symbols-outlined">login</span>
                <span class="nav-text">Login</span>

                </Link>
            </li>
            </ul>
        </nav>
    )
    }       
        
export default NavBar



