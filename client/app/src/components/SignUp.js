import React from "react";
import NavBar from "./NavBar";

function SignUp(){

    return(
        <div>
            <NavBar />
            <h1>LoginPage</h1>
            <form>
                <label for="username">Username</label>
                <input type="username" placeholder="Username" />
                <label for="password" >Password</label>
                <input type="password" placeholder="*****" />
                <button>Log In</button>                
            </form>
            <button>Register Here</button>
            <button>Log Out</button>
        </div>
    )

}

export default SignUp