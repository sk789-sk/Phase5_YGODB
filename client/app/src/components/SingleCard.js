import React, { useEffect,useState } from "react";
import NavBar from "./NavBar";
import TableRow from "./Tablerow";
import TableRowLink from "./Tablerow_and_Link";
import SingleDeck from "./SingleDeckView";
import { Link, Routes, Route, useMatch, useParams } from "react-router-dom";


function SingleCard () {

    const params = useParams();
    //grab the parameter form the url

    const [cardInfo,setCardInfo] = useState([])
    const [releaseInfo,setReleaseInfo] = useState([])


    console.log(params)

    useEffect( () => {
        fetch(`/cards/${params.id}`)
        .then((resp) => resp.json())
        .then((data) => (setCardInfo(data),setReleaseInfo(data.card_in_set)))
    }, [])

    console.log(cardInfo)
    console.log(releaseInfo)

    const renderRows = releaseInfo.map( (singleRelease) => {

        return <TableRow data={[singleRelease.rarity, 
            <Link to={`/Sets/${singleRelease.releaseSet.id}`}>{singleRelease.releaseSet.name}</Link>,
            singleRelease.card_code,
            singleRelease.releaseSet.releaseDate]} />
    })

    //We can keep the table row as a generic thing and just pass in links with the info again. 

    return(
        <div>
            <NavBar />
            <h1>Render Card Info</h1>

            <table className="tables" id="SingleCard" >
                <tbody>
                    <tr>
                        <th>Rarity</th>
                        <th>Release Set</th>
                        <th>Card Code</th>
                        <th>Release Date</th>
                        <th>Purchase Link?</th>
                    </tr>
                    {renderRows}
                </tbody>
            </table>
        </div>
    )
}

export default SingleCard