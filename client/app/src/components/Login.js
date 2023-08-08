import React, {useEffect,useState} from "react";
import NavBar from "./NavBar";

function Login(){

    const [username,setUsername] = useState('')
    const [enteredPassword,setEnteredPassword] = useState('')
    const [islogin,setIsLogin] = useState(true)
    const [user,setUser] = useState(null)

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
        .then(setUser(null))
    }

    function togglePage(){
        setIsLogin(!islogin)
        console.log(islogin)
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
        </div>
    )

}

export default Login