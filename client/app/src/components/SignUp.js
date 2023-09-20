import React from "react";

function SignUp({setUser, setIsLogin}){

    function handleRegister(e){
        e.preventDefault()
        //On register we send a post request to the user page
        let username = (e.target[0].value)
        let email = (e.target[1].value)
        let password = (e.target[2].value)

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
            <div className="Login-Content-Box">
                <header>Sign-Up</header>

                <form onSubmit={handleRegister} class="loginform">
                
                    <div className="input-field">
                        <input required="true" type="text" placeholder="Enter Username" className="input"/>
                    </div>

                    <div className="password">
                        <input type='text' required="true" placeholder="Enter Email" className="input" />
                    </div>

                    <div className="password">
                        <input htmlFor="password" required="true" type="password" placeholder="Enter Password" className="input"/>
                    </div>

                    <div className="submit-button">
                       <button class="submit">Register</button> 
                    </div>

                    <div className="form-link">
                        <span>Already have an account? <a href="#" onClick={setIsLogin}>Login</a></span>
                    </div>


            </form>
            </div>

        </div>
    )

}

export default SignUp