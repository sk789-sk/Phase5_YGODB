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
                resp.json()
                .then((user) => setUser(user))
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

<form onSubmit={handleLogIn} class="loginform">
  <p>Login</p>
  <div class="group">
    <input required="true" class="main-input" type="text" />
    <span class="highlight-span"></span>
    <label class="label-username">Username</label>
  </div>
  <div class="container-1">
    <div class="group">
      <input htmlFor="password" required="true" class="main-input" type="text" />
      <span class="highlight-span"></span>
      <label class="label-username">password</label>
    </div>
  </div>
  <button class="submit">Login</button>
</form>

    return(
        <div className="componentdiv">
            <NavBar />
            <h1>Login Page</h1>

            <form onSubmit={handleLogIn} class="loginform">
                <p>Login</p>
                <div class="group">
                    <input required="true" class="main-input" type="text" />
                    <span class="highlight-span"></span>
                    <label class="label-username">Username</label>
                </div>
                <div class="container-1">
                    <div class="group">
                    <input htmlFor="password" required="true" class="main-input" type="text" />
                    <span class="highlight-span"></span>
                    <label class="label-username">password</label>
                    </div>
                </div>
                <button class="submit">Login</button>
            </form>

            {/* <form className="loginform" onSubmit={handleLogIn}>
                <label htmlFor="username">Username</label>
                <input type="username" placeholder="Username" />
                <label htmlFor="password" >Password</label>
                <input type="password" placeholder="*****" />
                <button>Log In</button>
            </form> */}
            
            
            {/* <button onClick={togglePage}>Register Here</button> */}
            <button className="submit" onClick={handleLogOut}>LogOut</button>

            {/* <form onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
                <input type="username" placeholder="Username" />
                <label htmlFor="password" >Password</label>
                <input type="password" placeholder="*****" />
                <button>Confirm Registration</button>
            </form> */}

            <form onSubmit={handleRegister} class="loginform">
                <p>Register</p>
                <div class="group">
                    <input required="true" class="main-input" type="text" />
                    <span class="highlight-span"></span>
                    <label class="label-username">Username</label>
                </div>
                <div class="container-1">
                    <div class="group">
                    <input htmlFor="password" required="true" class="main-input" type="text" />
                    <span class="highlight-span"></span>
                    <label class="label-username">password</label>
                    </div>
                </div>
                <button class="submit">Sign Up</button>
            </form>
        </div>
    )

}

export default Login

