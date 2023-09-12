import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";


function UserProfile ({user}) {

    const [userInfo,setUserInfo] = useState([{card_in_inventory:[],user_decks:[],created_at:'loading',profile:'Sign in to View Profile'}])

    useEffect( () => {
        fetch(`/users/${user.id}`)
        .then((resp) => resp.json())
        .then((data) => setUserInfo([data]))
    },[])

    console.log(userInfo)

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
        <div className="componentdiv">
            <Header/>


        <p>{userInfo ? null : 'loading '}</p>
        <div>

        <div className="card">
            <div className="card-Header">
            </div>

            <div className="profileImage-container">
                <img className="profileImage" src={userInfo[0].profile} alt="profile" />
            </div>


            <div className="text-container">
            <div className="textContainer-left">

                <table className="left-table">
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{userInfo[0].username} </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{userInfo[0].email}</td>
                        </tr>
                        <tr>
                            <td><button> View Your Cards</button> </td>
                            <td><button>View Your Decks</button>  </td>
                        </tr>
                    </tbody>
                </table>
                <p className="name"> Username: {userInfo[0].username}</p>
                <p className="email">Email: {userInfo[0].email}</p>
                <button> View Your Cards</button>
                <button>View Your Decks</button>        
            </div>

            <div className="textContainer-right">
                <p className="proftext">Card Count: {userInfo[0].card_in_inventory.length}</p>
                <p className="proftext">Deck Counts {userInfo[0].user_decks.length}</p>
                <p className= "proftext">Join Date: {userInfo[0].created_at}</p>
            </div>
            </div>
        </div>  

        </div>
            <button className="DeleteAcc" onClick={handleClick}>Delete Account</button>
        </div>
    )

}

export default UserProfile


