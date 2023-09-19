import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cards from "./components/Cards";
import Inventory from "./components/Inventory"
import Login from "./components/Login"
import Decks from "./components/Decks";
import SingleDeck from "./components/SingleDeckView";
import UserDecks from "./components/UserDecks";
import SingleUsersDeck from "./components/SingleUsersDeck";
import Sets from "./components/Sets";
import SingleSet from "./components/SingleSet";
import UserProfile from "./components/UserProfile";
import NavBar from "./components/NavBar";
import SingleCard from "./components/SingleCard";
import DeckViewer from "./components/DeckView";
import SignUp from "./components/SignUp";

//No index over the app? might just have to make not included in template?


function App() {
  // Code goes here!
  //this is the first load in the app so we should check for a login right here 

  const [user, setUser] = useState({ 'username': 'DEFAULT', 'id': 1}) 


  useEffect( () => {
    fetch(`/CheckSession`)
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then((data) => setUser(data))
      }
      else{
        resp.json()
        .then(data => console.log(data))
      }
    })
  },[])


    //initially nobody is logged in. 
    //Turn this into a use context would be the best so we dont pass user to each page.

  
  //Route setup

  return (
    <div className='App'>
      {/* <Home_Page /> */}
      <BrowserRouter>
        <Routes>
        <Route path = '/' element = {<Home />}/>

        <Route path = 'Cards' element = {<Cards/>} />
        <Route path = 'Cards/:id' element = {<SingleCard />} />
          
        <Route path = 'Decks' element = {<Decks />} />
        <Route path = "Decks/:id" element = {<SingleDeck />} /> 

        <Route path = '/Inventory' element = {<Inventory user = {user}/>}/>
          
        <Route path = '/Sets' element = {<Sets/>} />
        <Route path= "/Sets/:id" element = {<SingleSet/>} />
        
        <Route path = '/UsersDecks' element = { <UserDecks user = {user} />} />
        <Route path = '/UsersDecks/:id'  element = {<SingleUsersDeck />}/>

        <Route path = '/Login' element = {<Login user = {user} setUser={setUser} />} />
        <Route path= "/UserProfile" element = {<UserProfile user = {user} />} />

        <Route path = '/TestSingleDeck' element = { <SingleDeck />} />
        <Route path = '/TestUserSingleDeck' element = {<SingleUsersDeck />} />
        <Route path = '/TestSingleSet' element = {<SingleSet />} />
        <Route path= "/TestSingleCardAll" />
        <Route path = '/Testregister' element = {<SignUp />} />

        <Route path = '/TestDeckView' element= {<DeckViewer/>}></Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
