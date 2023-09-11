import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"

function CardTableRow({data, path}){
    //This function will take in some data component which will just be an array of values and then populate a table row with the values.
    //For every data element in the data object we create a new cell with the corresponding information. the data object is an array so we can crate an number of cells. The row will have to be ordered

    //each one of these values should have a key 
    
    //Make the whole row return a link next

    function renderlevel(){}
    function renderrace(){}
    function renderattribute(){}


    return(
            <tr>
                <td className="image-cell">
                    <Link to={`${path}${data.id}`}>
                        <img className="tableImage" src={data.card_image}/>
                    </Link> 
                </td>

                <td className="text-cell">
                    <table className="innerDataTable">
                        <tr className="inner-row">
                            <td colSpan={8} width="100%">
                                <h4>{data.name}</h4>
                            </td>
                        </tr>
                        <tr className="inner-row">
                            <td colSpan={4} width="50%">{data.card_type}</td>
                            <td colSpan={4} width="50%">{data.card_race}</td>
                        </tr>
                        <tr className="inner-row">
                            {data.attack ? <td colSpan={2} width="25%">{data.attack} ATK</td> : null }
                            {data.defense ? <td colSpan={2} width="25%">{data.defense} DEF</td> : null}
                            {data.level ? <td colSpan={2} width="25%">LEVEL {data.level}</td>:null}
                            {data.card_attribute ? <td colSpan={2} width="25%">{data.card_attribute}</td>:null}
                        </tr>
                        <br></br>
                        <tr className="inner-row">
                            <td colSpan={8} width="100%">
                                <p>{data.description}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>



    )
    }      
        
export default CardTableRow