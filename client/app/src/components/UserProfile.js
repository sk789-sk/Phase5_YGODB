import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";


function UserProfile ({user}) {

    const [userInfo,setUserInfo] = useState([{card_in_inventory:[],user_decks:[],created_at:'loading',profile:'loading'}])

    useEffect( () => {
        fetch(`/users/${user.id}`)
        .then((resp) => resp.json())
        .then((data) => setUserInfo([data]))
    },[])

    console.log(userInfo)


    function handleClick(){
        console.log('hi')
    }

    function loadUserInfo(user){

    }

    return( 
        <div>
            <NavBar/>
        <p>{userInfo ? 'hi' : 'loading '}</p>
        <div>
            <p>{userInfo[0].username}</p>
            <p>Change Password</p>
            <p>Card Count: {userInfo[0].card_in_inventory.length}</p>
            <p>Deck Counts {userInfo[0].user_decks.length}</p>
            <p>Join Date: {userInfo[0].created_at}</p>
            <p>Profile {userInfo[0].profile}</p>
        </div>
            <button onClick={handleClick}>Delete Account</button>
        </div>
    )

}

export default UserProfile