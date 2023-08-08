import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";


function GlobalCard() {
    
    const [cardinfo,setCardInfo] = useState([])


    useEffect( () => {
        fetch(`/Cards${id}`)
    })

}