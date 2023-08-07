import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cards from "./components/Cards";
import Inventory from "./components/Inventory"
import Login from "./components/Login"
import Decks from "./components/Decks";
import SingleDeck from "./components/SingleDeckView";
import UserDecks from "./components/UserDecks";
import SingleUsersDeck from "./components/SingleDeckOwner";
import Sets from "./components/Sets";

//No index over the app? might just have to make not included in template?


function App() {
  // Code goes here!


  //Route setup

  return (
    <div className='App'>
      <h1>Welcome_Test page</h1>
      {/* <Home_Page /> */}
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Home />}/>
          <Route path = '/Cards' element = {<Cards/>} />
          <Route path = '/Decks' element = {<Decks />} />
          <Route path = '/Inventory' element = {<Inventory/>}/>
          <Route path = '/Sets' element = {<Sets/>}/>
          <Route path = '/Login' element = {<Login />} />
          <Route path = '/TestSingleDeck' element = { <SingleDeck />} />
          <Route path = '/TestUserDeck' element = { <UserDecks />} />
          <Route path = '/TestUserSingleDeck' element = {<SingleUsersDeck />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
