import React, {useEffect,useState} from "react";
import NavBar from "./NavBar";

function Login( {user, setUser}){

    const [username,setUsername] = useState('')
    const [enteredPassword,setEnteredPassword] = useState('')
    const [islogin,setIsLogin] = useState(true)


    function handleLogIn(e){
        e.preventDefault()
        let username = (e.target[0].value)
        let password = (e.target[1].value)

        fetch("/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {username,password})
        })
        .then((resp => {
            if (resp.ok) {
                resp.json().then((user) => setUser(user))
            }
        }))

    }
  
    function handleLogOut(){
        fetch("/Logout", {
            method: 'DELETE' 
        })
        .then(setUser({ 'username': 'DEFAULT', 'id': 1}))
    }

    function togglePage(){
        setIsLogin(!islogin)
        console.log(islogin)
    }

    function handleRegister(e){
        e.preventDefault()
        //On register we send a post request to the user page
        let username = (e.target[0].value)
        let password = (e.target[1].value)

        fetch("/Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {username,password})
        })
        .then((resp) => resp.json())
        .then((data) => setUser(data))
    }

    return(
        <div>
            <NavBar />
            <h1>LoginPage</h1>
            <form onSubmit={handleLogIn}>
                <label htmlFor="username">Username</label>
                <input type="username" placeholder="Username" />
                <label htmlFor="password" >Password</label>
                <input type="password" placeholder="*****" />
                <button>Log In</button>
            </form>
            <button onClick={togglePage}>Register Here</button>
            <button onClick={handleLogOut}>LogOut</button>

            <form onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
                <input type="username" placeholder="Username" />
                <label htmlFor="password" >Password</label>
                <input type="password" placeholder="*****" />
                <button>Confirm Registration</button>
            </form>
        </div>
    )

}

export default Login