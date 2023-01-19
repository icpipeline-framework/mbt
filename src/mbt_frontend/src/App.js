import React, { useState, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter,useNavigate,useLocation} from 'react-router-dom';

import { green } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


/// **** CONNECT TO IC BEGIN

import { defaultProviders } from "@connect2ic/core/providers"
import { createClient } from "@connect2ic/core"
import { Connect2ICProvider } from "@connect2ic/react"
import { AstroX } from "@connect2ic/core/providers/astrox"
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet"
//import * as counter from "canisters/counter"




import { AuthClient } from "@dfinity/auth-client";
import { DelegationIdentity } from "@dfinity/identity";
import { Actor, HttpAgent } from '@dfinity/agent';

// **** CUSTOM IMPORTS
import * as mbt from "../../declarations/mbt_backend";

import { mbt_backend, idlFactory as mbtDappIdl, canisterId as mbtDappCanisterId} from "../../declarations/mbt_backend";

import Stage from './stage_components/Stage';

import AppContext from './nav/AppContext';

const App = () => {



  console.log ("______ APP RENDERED______")

      
  const connect2Client = createClient({
    canisters: {
      mbt,
    },
    providers: [new PlugWallet(),]
  })
  console.log ("defaultProviders: ", defaultProviders);


  /*Auth*/
  const [isAuthed, setIsAuthed] = useState(false);
  let [authClient, setAuthClient] = useState("");
  let [mbtDapp, setMbtDapp] = useState("");

  // now we create the theme
  const defaultTheme = createTheme({
    palette: {
      primary: {
        light: green[300],
        main: "#fad096",
        dark: green[700],
      },
      secondary: {
        light: green[300],
        main: "#905707",
        dark: green[700],
      },
      background: {
        default: '#fbb03a',
        paper: '#FFFFFF',
      },
    }, 
    typography: {
      button: {
        textTransform: "none",
        fontSize:"1em"
      }
    }
  });

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  let agent;
  let identity ;

  const init = async () => {

    authClient = await AuthClient.create();

    agent = new HttpAgent({ identity });
    //agent.fetchRootKey();
        // Fetch root key for certificate validation during development
    if(process.env.NODE_ENV !== "production") {
      agent.fetchRootKey().catch(err=>{
        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
        console.error(err);
      });
    }// end if production 

    console.log(`mbtDappCanisterId: `, mbtDappCanisterId);

    mbtDapp = Actor.createActor(mbtDappIdl, { agent, canisterId: mbtDappCanisterId });

    setAuthClient (authClient) ;

    setMbtDapp (mbtDapp) ;

  } // end initmbt

  if (!mbtDapp) {
    init();
    
  }
  const userSettings = {
    /*Auth*/
    isAuthedName: isAuthed,
    mbtDappName: mbtDapp,
    /*Themes*/
    defaultThemeName: defaultTheme,
    /*AuthFunc*/
    setIsAuthed,
    setMbtDapp,
    sleep
  } 

  


  console.log ("______ APP RENDERED2______")
  return (
    
  
    <AppContext.Provider value={userSettings}>
    <Connect2ICProvider client={connect2Client}>
      <ThemeProvider theme={defaultTheme}>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <BrowserRouter initialEntries={['/framework']} initialIndex={0}>   
              <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
    
                <Stage />
        

                  
              

            </BrowserRouter>
          </Box>
      </ThemeProvider>
    </Connect2ICProvider>
    </AppContext.Provider>

  );
}

export default App;