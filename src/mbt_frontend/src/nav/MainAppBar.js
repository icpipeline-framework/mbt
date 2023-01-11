
import React, { useState, useContext } from 'react';

import { useLocation } from "react-router-dom";
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// **** CUSTOM IMPORTS

import AppContext from '../nav/AppContext';


const MainAppBar = (props) => {
  
  console.log ("______ MainAppBar RENDERED______")
  
  const myContext = useContext(AppContext);


  // check for plugged

  let plugWalletObject = myContext.plugWalletObjectName ;

  let location = useLocation();




  var colorActive = "#fce7c9";
  var colorNotActive = "#673e05";

  var colorDashboard=colorActive;
  var colorMint=colorNotActive;
  var colorDocumentation=colorNotActive;

  var displayNav = [
    
        <Box key={1} sx={{textAlign:"right", width:"100%" }}>
          <Tooltip title="This Tip" enterNextDelay={300}>
          <Link
            variant="button"
            color="#fff"
            href="#"
            underline="hover"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => { props.mainNavClick("Home")}}
          >
            This is an example
          </Link>
          </Tooltip>
        </Box>
        ] ;

    if (location.pathname == "/dashboard" ) {

      colorDashboard=colorNotActive;
      colorMint=colorActive;
      colorDocumentation=colorNotActive;

      displayNav = [
        <Box key={1} sx={{textAlign:"right", width:"100%" }}>
          <Tooltip title="I want Rewards" enterNextDelay={300}>
          <Link
            variant="button"
            color="#fff"
            href="#"
            underline="hover"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => { props.mainNavClick("Mint")}}
          >
            Example 2
          </Link>
          </Tooltip>
        </Box>
        ] ;
    } // end if about 

   

    


    return (
      
      <AppBar
      position="static"
      color="default"
      elevation={4}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            position:"fixed", 
            zIndex:10,
            backgroundColor:"#f3920c"}}
    >
      <Toolbar sx={{ flexWrap: 'wrap', backgroundColor:"#f3920c" }}>

      <Grid container sx={{border:"0px solid #000"}}>
        <Grid item xs={12}  sx={{
                                    p: {
                                        xs:0 ,
                                        md:2,
                                    }}}>
          
              <Box
                  onClick={() => { props.mainNavClick("Home")}}
                  component="img"
                  sx={{
                    content: {
                        xs: `url("mbHeaderBannerFull.png")`,//img src from xs up to md
                        md: `url("mbHeaderBannerFull.png")`,  //img src from md and up
                    },
                    cursor:"pointer"
                    , width: {
                      xs: "450px",
                      md: "720px",
                    }
                  }}
                  alt="Logo"
              />
        </Grid>
        </Grid>
        
        {/*
        
        <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
        */}

      </Toolbar>
    </AppBar>

    

    );
  }// end MainAppBar

  export default MainAppBar ;
  