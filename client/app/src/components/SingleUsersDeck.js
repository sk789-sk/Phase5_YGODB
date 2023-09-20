import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import { json, useParams, Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "./Header";
import PublishIcon from '@mui/icons-material/Publish';
import DeckViewer from "./DeckView";
import DeckViewEditer from "./DeckViewEdit";
import Error401 from "./Error401";
import Error404 from "./Error404";




function SingleUsersDeck() {
    //Basically a single deck but we have edit options

    const params = useParams();

    const [cardsInDeck,setCardsInDeck] = useState([{card : {card_image:'loading', name:'loading' }, card_id:1,deck_id:1,quantity:1}]) 
    const [deckName,setDeckName] = useState('')
    const [newQuantity,setNewQuantity] = useState(0)
    const [refresh,setRefresh] = useState(true)
    const [isError,setIsError] = useState(false)
    const [errorCode,setErrorCode] = useState(0)

    // useEffect( () => {
    //     fetch(`/Deck/${params.id}`)
    //     .then((resp) => resp.json())
    //     .then((data) => (setCardsInDeck(data.card_in_deck),setDeckName(data.name) ))
    // },[refresh])

    function toggleRefresh(){
        setRefresh(!refresh)
    }


    useEffect ( () => {
        fetch(`/Deck/${params.id}`)
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then((data) => (setCardsInDeck(data.card_in_deck),setDeckName(data.name)))
            }
            else{
                if (resp.status === 404){
                    setErrorCode(404); setIsError(true) ; setDeckName('404 - Deck Does Not Exist')
                }
                else {
                    setErrorCode(401); setIsError(true) ; setDeckName('401 - Not Authorized ')
                }
                (console.log(errorCode))
                // .then(data => console.log(data))
                // .then(setIsError(true))
                // .then(console.log(isError))
            }
        })
    },[refresh])

    //Now we want to render rows with all card info but we want to have the edit buttons to edit quantity or delete from the deck. These will go to the cardinDeck endpoint since that is what we are edditing now .

    //render functions


    //Need quantity of each card to render lets just put it into a new array to make life . This can def be done better

    let cardstorender = []
    for (let card of cardsInDeck){
        for (let i=0; i<card.quantity;i++){
            let card_obj = {name:card.card.name, image:card.card.card_image,id:card.card_id}
            cardstorender.push(card_obj)
        }
    }
    
    const renderDeckGridElements = cardstorender.map( (card) => {
    return (
        <div className="img-grid-item">
            <Link to={`/Cards/${card.id}`}>
                <img src={card.image} alt={card.name} />  
            </Link> 
        </div>
            )
        }
     )

    const renderRows = cardsInDeck.map( (card) => {
        return <TableRow key={card.id} 
        data = {[card.card.name, card.quantity]}

        button ={<Button onClick={ () => 
            fetch(`/cardindeck/${card.id}`, {
                method: "PATCH",
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({'quantity' : newQuantity})
            })
            .then( resp => {
                if (resp.ok) {
                    resp.json()
                    .then(setRefresh(!refresh))
                }
                else{
                    resp.json()
                    .then(data => console.log(data))
                }
            })
         }>
        <EditIcon /></Button>}

        deletebutton = {<Button onClick={ () =>
    
            fetch(`/cardindeck/${card.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then (resp => {
            if (resp.ok) {
                (setRefresh(!refresh))
                // .then( data => console.log(data))
            }
            else {
                resp.json()
                .then(data => console.log(data))
            }
        })
        }>
        <DeleteIcon/></Button>}


        />
    })

    function editName(e){
        e.preventDefault()
        let new_name = e.target[0].value
        
        fetch(`/Deck/${params.id}`, {
            method:"PATCH",
            headers: {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
               body: JSON.stringify({'name' : new_name})
            })
            .then((resp) => resp.json())
            .then((data) => setDeckName((deckName) =>data.name))

        } 




    //logic elements

    function handleSubmit(e){
        e.preventDefault()
        let deck_id = params.id
        let card_name = e.target[0].value
        let card_quantity = e.target[1].value


        const newCardinDeck = {
            'name' : card_name,
            'deck_id' : deck_id,
            'quantity' : card_quantity
        }

        fetch(`/cardindeck`, {
            method: 'POST',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"

            },
            body:JSON.stringify(newCardinDeck)
        })
        .then(resp => {
            if (resp.ok) {
                console.log('hi')
                resp.json()
                .then((data => setCardsInDeck([...cardsInDeck,data])))
            }

            else{ //in reality this is to toggle some error message
                console.log('bye')
                resp.json()
                .then(data => console.log(data))
            }
        }
        
        )

    }

    return(
        <div className="componentdiv">
            <Header/>

            <br></br>

            <h1 className="Single-Deck-View-Global">{deckName}</h1>   
            {/* this can be a small table of info  */}
            <br></br>
            <br></br>
            {errorCode===404 ? <Error404/> : 
            errorCode==401 ? <Error401/> : 
            <div className="main-content-singleDeck">
            <DeckViewEditer cardsInDeck={cardsInDeck} toggleRefresh={toggleRefresh} id={params.id} setCardsInDeck={setCardsInDeck} setDeckName={setDeckName}/>
            </div>
            }
            <div className="footer">
                <Header />
            </div>
        </div>
    )
}

export default SingleUsersDeck

