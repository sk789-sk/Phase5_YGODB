import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"


function SingleCardTable({data}){

    //data is the card Data


    console.log(data)



    return(
        <div>
            
        </div>
    )
}

export default SingleCardTable

{/* <table>
                <tbody>
                    <tr>
                        <td className="SingleCard-Image-Cell">
                            <table className="SingleCard-image-table">
                                <tbody>
                                    <tr className="SingleCard-main-image">
                                        <td>
                                            <img src={data.card_image} />
                                        </td>
                                    </tr>
                                    <tr className="SigleCard-alt-images">
                                        <td> Alt images go here</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td className="SingleCard-Data-Cell">
                            <table className="SingleCard-data-table">
                                <tbody>
                                    <tr className="inner-row">
                                        <td>{data.name}</td>
                                    </tr>

                                    <tr className="inner-row">
                                        <td>{data.card_type}</td>
                                        <td>{data.card_race}</td>
                                    </tr>

                                    <tr className="inner-row">
                                        <td>{data.attack ? data.attack : null}</td>
                                        <td>{data.defense ? data.defense : null}</td>
                                        <td>{data.level ? data.level : null}</td>
                                        <td>{data.card_attribute ? data.card_attribute : null}</td>
                                    </tr>

                                    <tr className="inner-row">
                                        <td>Boolean Vals</td>
                                    </tr>

                                    <tr className="inner-row">
                                        <td>{data.description}</td>
                                    </tr>
                                </tbody>

                            </table>

                        </td>
                    </tr>
                </tbody>
            </table> */}