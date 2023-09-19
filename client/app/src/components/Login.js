import React, {useEffect,useState} from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import SignUp from "./SignUp";
import LoginBox from "./LoginBox";

function Login( {user, setUser}){

    const [islogin,setIsLogin] = useState(true)

    // setIsLogin(!islogin)

    function togglelogin(){
        setIsLogin(!islogin)
    }

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
                .then(console.log(user))
            }
        }))

    }
  
    function handleLogOut(){
        fetch("/Logout", {
            method: 'DELETE' 
        })
        .then(setUser({ 'username': 'DEFAULT', 'id': 1}))
    }

    return(
        <div className="componentdiv">
            <Header />
            <h1>Login Page</h1>

            {islogin ? <LoginBox setUser={setUser} setIsLogin={togglelogin} /> : <SignUp setUser={setUser}  setIsLogin={togglelogin}/>}
{/* 
            <SignUp />
            <br></br>
            <LoginBox /> */}
                       
            <button className="bbbb" onClick={handleLogOut}>LogOut</button>



 
        </div>
    )

}

export default Login

            // {/* <div className="Login-Content-Box">
            //     <header>Login</header>

            //     <form onSubmit={handleLogIn} className="loginform">

            //         <div className="input-field">
            //             <input required="true" type="text" placeholder="Enter Username or email"  className="input" />
            //         </div>
                    
            //         <div className="password">
            //             <input htmlFor="password" required="true" type="password" placeholder="Enter Password" className="input"/>
            //         </div>

            //         <div className="form-link">
            //             <a href="#">Forgot Password?</a>

            //         </div>

            //         <div className="submit-button">
            //            <button class="submit">Login</button> 
            //         </div>

            //         <div className="form-link">
            //             <span> Don't have an account? <a href="#">Sign-Up</a></span>
            //         </div>

                    

                
            // </form>
            // </div> */}

            //            {/* <form onSubmit={handleRegister} class="loginform">
            //     <p>Register</p>
            //     <div class="group">
            //         <input required="true" class="main-input" type="text" />
            //         <span class="highlight-span"></span>
            //         <label class="label-username">Username</label>
            //     </div>
            //     <div class="container-1">
            //         <div class="group">
            //         <input htmlFor="password" required="true" class="main-input" type="text" />
            //         <span class="highlight-span"></span>
            //         <label class="label-username">password</label>
            //         </div>
            //     </div>
            //     <button class="submit">Sign Up</button>
            // </form> */}