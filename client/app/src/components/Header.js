import React from "react";
import { Link } from "react-router-dom"
import NavBar from "./NavBar";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";


function Header(){



    return(
        <div className="header">
            <Box>
            <AppBar color="secondary">
                <Toolbar>
                    <Typography variant="h2" color="textPrimary">
                        YGO-DB
                    </Typography> 
                    <NavBar />
                </Toolbar>
            </AppBar>
            </Box>
            <NavBar />
        </div>
    ) 

}

export default Header