import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";


function UserProfile ({user}) {

    const [userInfo,setUserInfo] = useState([{card_in_inventory:[],user_decks:[],created_at:'loading',profile:'Sign in to View Profile'}])

    useEffect( () => {
        fetch(`/users/${user.id}`)
        .then((resp) => resp.json())
        .then((data) => setUserInfo([data]))
    },[])


    function handleClick(){

        fetch(`users/${user.id}`, {
            method:"DELETE",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(setUserInfo([{card_in_inventory:[],user_decks:[],created_at:'loading',profile:'loading'}]))

    }

    return( 
        <div>
            <NavBar/>
        <p>{userInfo ? null : 'loading '}</p>
        <div>

        <div className="card">
            <div className="profileImage">
            </div>

        <div className="textContainer">
            <p className="profile">Profile</p>
            <p className="name">{userInfo[0].username}</p>        
            <p className="proftext">Card Count: {userInfo[0].card_in_inventory.length}</p>
            <p className="proftext">Deck Counts {userInfo[0].user_decks.length}</p>
            <p className= "proftext">{userInfo[0].created_at}</p>
        </div>
        </div>            
        </div>
            <button className="DeleteAcc" onClick={handleClick}>Delete Account</button>
        </div>
    )

}

export default UserProfile


