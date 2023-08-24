import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"

function TableRowLink({data, id, path,button,deletebutton}){
    //This function will take in some data component which will just be an array of values and then populate a table row with the values.
    //For every data element in the data object we create a new cell with the corresponding information. the data object is an array so we can crate an number of cells. The row will have to be ordered

 
    const renderData = data.slice(1).map( (val) => {
        return <td>{val}</td>
    })

    return(
        <tr>
            <td>
                <Link to={`${path}${id}`}>{data[0]}</Link> 
            </td>
            {renderData}
            <td>{button}</td>
            <td>{deletebutton}</td>
        </tr>

    )
    }       
        
export default TableRowLink