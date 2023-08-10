import React from "react";
import NavBar from "./NavBar";


//import dependencies 

function Home(){

    return(
        <div className="componentdiv">
            <NavBar />
            <h1 className="main-header" >Yugioh Card Mapping</h1>

            <h3>Map Your physical collection to a digital database. </h3>
            <h3>Build Decks out of your collection or create decks you plan to build</h3>
            <h3>Browse Different Decks others have created</h3>
            <h3>See what Cards You Need for all your Decks</h3>
            {/* <Footer /> */}
        </div>
    )
}

export default Home