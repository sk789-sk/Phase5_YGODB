import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"

function CardTableRow({data, path}){
    //This function will take in some data component which will just be an array of values and then populate a table row with the values.
    //For every data element in the data object we create a new cell with the corresponding information. the data object is an array so we can crate an number of cells. The row will have to be ordered

    //each one of these values should have a key 
    
    console.log(data)
    console.log(path)
    
    console.log(data.id)

    //Make the whole row return a link next

    return(
            <tr>
                <td className="image-cell">
                    <Link to={`${path}${data.id}`}>
                        <img className="tableImage" src={data.card_image}/>
                    </Link> 
                </td>

                <td className="text-cell">
                    <table className="innerDataTable">
                        <tr>
                            <td>{data.name}</td>
                        </tr>
                        <tr>
                            <td>{data.card_type}</td>
                            <td>{data.card_race}</td>
                        </tr>
                        <tr>
                            {data.attack ? <td>{data.attack} ATK</td> : null }
                            {data.defense ? <td>{data.defense} DEF</td> : null}
                            {data.level ? <td>level {data.level}</td>:null}
                        </tr>
                        <br></br>
                        <tr>
                            <td>
                                {data.description}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>



    )
    }      
        
export default CardTableRow