
import React, { useState, useContext } from 'react';

import { useLocation } from "react-router-dom";
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

/// connect2IC
import { useConnect } from "@connect2ic/react"
import { useProviders } from "@connect2ic/react"



// **** CUSTOM IMPORTS

import AppContext from '../nav/AppContext';
import { ContentCutOutlined } from '@mui/icons-material';


const MainAppBar = (props) => {
  
  console.log ("______ MainAppBar RENDERED______")
  
  const myContext = useContext(AppContext);

  const [everConnected, setEverConnected] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const { cancelConnect } = useConnect() ;

  // call manually somewhere  
  // check for plugged

  let plugWalletObject = myContext.plugWalletObjectName ;

  let location = useLocation();

  //const [providers] = useProviders() ;

  //console.log ("providers: ", providers);

  // // Array<Provider>
  // providers.map(provider => {
  //   // Provider
  //   provider
    
  //   // string
  //   provider.meta.id

  //   // string
  //   provider.meta.name

  //   // <img /> src string
  //   provider.meta.icon.light
  //   provider.meta.icon.dark
  // })

  const {
    principal,
    connect,
    disconnect,
    status,
    isInitializing,
    isIdle,
    isConnecting,
    isConnected,
    isDisconnecting,
    activeProvider,
  } = useConnect({
    onConnect: () => {
      // Signed in
      console.log ("logged in ");
      setWalletConnected (true);
    },
    onDisconnect: () => {
      // Signed out
      console.log ("logged ou ");
      
      setWalletConnected (false);
    }
  })

  const doConnect = async () => {

    try {
      cancelConnect();
      connect ("plug");

    } catch (e) {
      
      console.log("error on the connect",e);
      //disconnect();
    } // end try catch

  } // end doConnect

  console.log ("status: ", status);
  console.log ("isInitializing: ", isInitializing);
  console.log ("isIdle: ", isIdle );
  console.log ("isConnecting: ", isConnecting);
  console.log ("isConnected: ", isConnected   );
  console.log ("isDisconnecting: ", isDisconnecting);
  console.log ("principal: ", principal);

  console.log ("walletConnected: ", walletConnected);
  if (!walletConnected) {
      //connect ();
      console.log ("logged ou TTTTT");
  }
  if (isConnected && !principal) {
    disconnect ();
  }

  var colorActive = "#fce7c9";
  var colorNotActive = "#673e05";

  var colorDashboard=colorActive;
  var colorMint=colorNotActive;
  var colorDocumentation=colorNotActive;

  var displayNav = [
    
    <Box key={1} sx={{display:"flex",  pt: {xs: 0,md: 0,}, justifyContent:{xs: "right",md: "left",}, border:"0px solid #000", flexGrow:1 }}>
          <Tooltip title="Mint MBTs" enterNextDelay={300}>
          <Link
            variant="button"
            color="text.primary"
            underline="hover"
            sx={{ my: 1, mx: 1.5, cursor:"pointer" }}
            onClick={() => { props.mainNavClick("Home")}}
          >
            Mint
          </Link>
          </Tooltip>
          <Tooltip title="How does this Work?" enterNextDelay={300}>
          <Link
            variant="button"
            color="text.primary"
            underline="hover"
            sx={{ my: 1, mx: 1.5, cursor:"pointer" }}
            onClick={() => { props.mainNavClick("mintHow")}}
          >
            How
          </Link>
          </Tooltip>
          <Tooltip title="What are MBTs?" enterNextDelay={300}>
          <Link
            variant="button"
            color="text.primary"
            underline="hover"
            sx={{ my: 1, mx: 1.5, cursor:"pointer" }}
            onClick={() => { props.mainNavClick("mintWhat")}}
          >
            What
          </Link>
          </Tooltip>
        </Box>
        ] ;

    if (location.pathname == "/dashboard" ) {

      colorDashboard=colorNotActive;
      colorMint=colorActive;
      colorDocumentation=colorNotActive;

      displayNav = [
        <Box key={1} sx={{display:"flex", justifyContent:"left", border:"1px solid #000", flexGrow:1 }}>
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

   
    
    
    var displayWalletConnected = [

      <Box key={1} > 
      <Button  variant="contained" color="secondary" onClick={() => { doConnect(); }} sx={{ display:"flex", justifyContent:"center",   width:"160px"}}>
          Connect
        <Box elevation={0} sx={{ ml:1, mr:1, border:"0px solid #f9c57d", justifyContent:"center"}} >      
                
                <img
                    src={
                    "mbtMain.png"
                    }
                    srcSet={"pluglogo.png?"}
                    alt="Plug"
                    loading="lazy"
                    width="30px"
                    />
            </Box>

      </Button>      

      </Box>
    ];

    if (status.idle=="connecting" ){


        displayWalletConnected = [

          <Box key={1} > 
          <Button disabled variant="contained" color="secondary"  sx={{ display:"flex", justifyContent:"center",   width:"160px"}}>
              ... Connecting ...
    
          </Button>      
          </Box>
        ];

    } else  {


      if (walletConnected ){

        displayWalletConnected = [

          <Box key={1} > 
          <Button  variant="contained" color="secondary" onClick={() => { disconnect(); }} sx={{ display:"flex", justifyContent:"center",  width:"160px"}}>
            Disconnect
              <Box elevation={0} sx={{ ml:1, mr:1, border:"0px solid #f9c57d", justifyContent:"center"}} >      
                      
                      <img
                          src={
                          "mbtMain.png"
                          }
                          srcSet={"pluglogo.png?"}
                          alt="Plug"
                          loading="lazy"
                          width="30px"
                          />
                  </Box>
          </Button>      
    
          </Box>
        ];
    }


    }

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

          
      <Grid container sx={{border:"0px solid #000",  maxWidth: 'xl', m:"auto"}}>
        <Grid item xs={0} md={3} sx={{}}>
          
        </Grid>
        <Grid item xs={12} md={6} sx={{
                                    p: {
                                        xs:0 ,
                                        md:2,
                                    }}}>
          
                <Box
                  onClick={() => { props.mainNavClick("Home")}}
                  
                  sx={{
                    content: {
                        xs: `url("mbHeaderBannerFull.png")`,//img src from xs up to md
                        md: `url("mbHeaderBannerFull.png")`,  //img src from md and up
                    },
                    cursor:"pointer"
                    ,width:"100%", border:"0px solid #000"
                  }}
                  alt="Logo"
              />
          
        </Grid>
        <Grid item xs={12} md={3} sx={{alignContent:"baseline" , display:"flex", border:"0px solid #000"}}>
          <Grid container sx={{mt:{xs:0, md:5, }, }}> 
                  <Grid item xs={6}  md={12} sx={{display: "flex", justifyContent:{xs: "left",md: "left",}}}>
                                
                    
                      {displayWalletConnected}
                      
                    
                  </Grid>
                  <Grid item xs={6} md={12}>
                    {displayNav} 
                  </Grid>
          </Grid>
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
  