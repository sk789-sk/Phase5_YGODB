import React from "react";

function LoginBox ({setUser,setIsLogin}){

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
                .then(console.log('hello'))
            }
        }))

    }

    return(
        <div>
            <div className="Login-Content-Box">
                <header>Login</header>

                <form onSubmit={handleLogIn} className="loginform">

                    <div className="input-field">
                        <input required="true" type="text" placeholder="Enter Username or email"  className="input" />
                    </div>
                    
                    <div className="password">
                        <input htmlFor="password" required="true" type="password" placeholder="Enter Password" className="input"/>
                    </div>

                    <div className="form-link">
                        <a href="#">Forgot Password?</a>

                    </div>

                    <div className="submit-button">
                       <button class="submit">Login</button> 
                    </div>

                    <div className="form-link">
                         <span> Don't have an account? <a href="#" onClick={setIsLogin}>Sign-Up</a></span>
                    </div>

                    

                
            </form>
            </div>

        </div>
    )
}

export default LoginBox