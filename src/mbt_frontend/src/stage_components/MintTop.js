import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LinearProgress from '@mui/material/LinearProgress';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';


/// connect2IC
import { useConnect } from "@connect2ic/react"
import { useProviders } from "@connect2ic/react"


import { Principal } from '@dfinity/principal';

// **** CUSTOM IMPORTS

import AppContext from '../nav/AppContext';
import FormTextField from '../nav/FormTextField';


const MintTop = (props) => {



  console.log ("______ MintTop RENDERED______")

  // now we build the click for the mint

  
  const myContext = useContext(AppContext);
  const [isChecking, setIsChecking] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  const [isMinted, setIsMinted] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [textFieldType, setTextFieldType] = useState("account");
  const [walletPrincipal, setWalletPrincipal] = useState("");
  const [mintNumberOfTokens, setMintNumberOfTokens] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");

  const [walletConnected, setWalletConnected] = useState(false);

  const mbtDapp = myContext.mbtDappName;

    const {
      principal,
      status,
      isConnected,
      isInitializing,
    } = useConnect({
      onConnect: () => {
        // Signed in
        console.log ("MINTTOP LOGGED in ");
        
        setWalletConnected (true);
      },
      onDisconnect: () => {
        // Signed out
        console.log ("MINTTOP LOGGED out ");
        
        setWalletConnected (false);
        //setWalletPrincipal ("");
      }
    })

    if (walletPrincipal != principal && principal != "" && status.idle == "connected" ) {
      setWalletPrincipal (principal); 
    } 
    if (status.idle == "connected" && walletPrincipal == "" ) {
      setWalletPrincipal(principal);
      if (isChecking) 
        setIsChecking(false);
    }
    if (status.idle == "initializing" && walletPrincipal == "" ) {
      if (!isChecking) 
        setIsChecking(true);
    }
    if (status.idle == "idle" && !principal) {
      if (isChecking) 
        setIsChecking(false);
    }
    if (status.idle == "disconnecting" ) {
      if (walletPrincipal != "" ) {
        setWalletPrincipal("");

      }
    }
  const onAccountNumberChange = (e) => {
  
    setWalletPrincipal(e.target.value);
  
  } // end onAccountNumberChange

  const onMintNumberOfTokensChange = (e) => {
    const mintNumberAsNumber = Number (e.target.value.replace(/,/g,'')) ;
    var anyError = "";

    if ((isNaN(mintNumberAsNumber) || isNaN(parseFloat(mintNumberAsNumber))) ) {
      anyError += "Number of Tokens needs to be numeric. ";
      setMintNumberOfTokens("");
    }
    if (mintNumberAsNumber > 100000 ) {
      anyError += "Number of Tokens should not exceed 100,000."
    }
    

      
    if (anyError) {
        setErrorMsg (anyError);
        
    } else {

      if (errorMsg != "")
        setErrorMsg ("");

      const formattedNumber = mintNumberAsNumber.toLocaleString("en-US");

      console.log ("formattedNumber: ", formattedNumber) ;

      setMintNumberOfTokens(formattedNumber);

    }
    
  
  } // end onMintNumberOfTokensChange


  const resetMint = async ()  =>  {

    console.log ("resetMint BEGIN") ;
    setLoadingBalance (false);
    setMintNumberOfTokens ("" );
    setWalletPrincipal ("" );

    setIsMinted(false);

    console.log ("resetMint END") ;

  } // end clickCanisterAccount

  const clickMintMBs = async ()  =>  {

    var mintNumberAsNumber = Number (mintNumberOfTokens.replace(/,/g,'')) ;
    var anyError = "";

    if (walletPrincipal == "" ) {
      anyError += "A Wallet Principal is required. ";

    } else {

      try {
        var walletPrincipalAsPrincipal = Principal.fromText(walletPrincipal);
      } catch (e) {
        
        anyError += `Wallet Principal is not valid : ${e} . `;

        console.log("catch error from principal",e);
        
        
      } // end try catch 
      
    }
    if (!anyError) {
       // then we try the how many tokens

      if (isNaN (mintNumberAsNumber) || mintNumberAsNumber <= 0 ) {
        anyError += "A quantity of Tokens is required. ";
      
      } // end if mint number
    } // end if error with the principal
    
    if (anyError) {
        setErrorMsg (anyError);

    } else {
      if (errorMsg != "")
        setErrorMsg (""); 


      console.log ("clickMintMBs BEGIN - mintNumberAsNumber: ", mintNumberAsNumber) ;
      setIsMinting(true);
      mintNumberAsNumber = mintNumberAsNumber * 100000000;

      const mintRequest = {
        to: {
          owner : walletPrincipalAsPrincipal,
          subaccount: []
        },
        amount:mintNumberAsNumber,
        memo:[] ,
        created_at_time: []
      };

      
  
      // const fetchData = await mbtDapp.greet("what up").catch(e => { return "ICPM Error: " + e });
      var tempError = "";
      const fetchData = await mbtDapp.mintNow(mintRequest).catch(e => { tempError = "Minter Error: " + e });
      
      console.log ("2- managePrincipal - after await");
  
      console.log ("mbtCanister Response: ", fetchData);
  
      
      if ( tempError != "" ) {
        setErrorMsg (tempError);

      } else {
      
        if ( !(fetchData.mintResponse.ok > -1 )) {

        var fetchDataString = JSON.stringify (fetchData, (key, value) =>
                  typeof value === 'bigint'
                      ? Number(value)
                      : value // return everything else unchanged
                  , 2) ;

          setErrorMsg (fetchDataString);
        } else {
          setIsMinted(true);
        }
        
    
      } // end if error from IC call
  
      setIsMinting(false);

    } // end if there were any errors with the form

    console.log ("clickMintMBs END") ;

  } // end clickMintMBs



  const checkAccountBalance = async ()  =>  {

    var mintNumberAsNumber = Number (mintNumberOfTokens.replace(/,/g,'')) ;
      console.log ("checkAccountBalance BEGIN: ", mintNumberAsNumber) ;
      if (errorMsg != "")
        setErrorMsg ("");
    var anyError = "";

    if (walletPrincipal == "" ) {
      anyError += "A Wallet Principal is required. ";

    } else {

      try {
        var walletPrincipalAsPrincipal = Principal.fromText(walletPrincipal);
      } catch (e) {
        
        anyError += `Wallet Principal is not valid : ${e} . `;

        console.log("catch error from principal",e);
        
        
      } // end try catch 
      
    }
    
    if (anyError) {
        setErrorMsg (anyError);

    } else {

      if (errorMsg != "")
        setErrorMsg (""); 


      setIsChecking(true);

      
      const tempAccount =  {
          owner : walletPrincipalAsPrincipal,
          subaccount: []
        };

  
      // const fetchData = await mbtDapp.greet("what up").catch(e => { return "ICPM Error: " + e });
      var tempError = "";
      const fetchData = await mbtDapp.checkAccountBalance(tempAccount).catch(e => { tempError = "Check token Error: " + e });
      
      console.log ("2- checkAccountBalance - after await");
  
      console.log ("checkAccountBalance Response: ", fetchData);
  
      
      if ( tempError != "" ) {
        setErrorMsg (tempError);

      } else {
      
        if (  (fetchData.responseStatus != "Green" )) {

        var fetchDataString = JSON.stringify (fetchData, (key, value) =>
                  typeof value === 'bigint'
                      ? Number(value)
                      : value // return everything else unchanged
                  , 2) ;

          setErrorMsg (fetchDataString);
        } else {
          setAccountBalance (fetchData.accountBalance) ;
          setTotalSupply(fetchData.totalSupply);

        }
        
    
      } // end if error from IC call
  
      setIsChecking(false);

    } // end if there were any errors with the form

    console.log ("checkAccountBalance END") ;

  } // end checkAccountBalance


  var displayForm = [

      <Grid  key={1}  container>
        <Grid item xs={12} md={6}  sx={{display:"flex", pl:1, pr:1}} >
                  
        <FormTextField 
              onChange={onAccountNumberChange}
              value={walletPrincipal}
              label={"Wallet Principal"} //optional
              type="text"
              helperText=""
              />  
        </Grid>
          <Grid item xs={12} md={3} sx={{display:"flex", pl:1, pr:1}} >
            
          <FormTextField 
                onChange={onMintNumberOfTokensChange}
                value={mintNumberOfTokens}
                label={"How Many Tokens?"} //optional
                type="text"
                helperText=""
                />  
            </Grid>
            <Grid item xs={12} md={3}  sx={{display:"flex"}} >
                    
              <Typography variant="subtitle2" align="center" color="#ca7a0a" component="p" sx={{p:1,fontStyle:"italic"}}>
              Number of Tokens should not exceed 100,000. 
              </Typography> 
            </Grid>
      </Grid>

  ] ;
  // if we have a principal from the wallet show that ...


  // check if we have a principal and we are connected to a wallet
  if (walletPrincipal && principal && isConnected) {

    if (!loadingBalance) {
      setLoadingBalance (true);
      checkAccountBalance () ;

    }

    // var displayPrincipalBalanceOf = [ 

    //   <Button key={1}  variant="outlined" onClick={() => { checkAccountBalance(); }} sx={{ m:"auto", flexGrow:1, display:"flex"}}>
    //         Check Balance
    //   </Button>

    // ]
    
    var displayPrincipalBalanceOf = [ 

      <Grid key={1} container sx={{backgroundColor:"#fce8cc", borderRadius:2, mb:1,p:1,border:"1px solid #673e05", }}>
        <Grid item xs={12} md={6}>
              
            <Typography variant="h4" color="#673e05" component="p" sx={{p:1,fontStyle:"", textAlign:{xs:"center",md:"right"}}}>
              Your Current Balance:
            </Typography> 

        </Grid>
        <Grid item xs={12} md={6} sx={{display:"flex", justifyContent: {xs:"center",md:"left"}}}>
              
              <Typography variant="h4" color="#673e05" component="p" sx={{p:1,fontStyle:"", borderBottom:"1px solid #f7b354", width:"200px",textAlign:{xs:"center",md:"left"}}}>
                {((Number(accountBalance)/100000000).toLocaleString("en-US"))} MBs
              </Typography> 
          
        </Grid>
      </Grid>
    ]; //
    



    displayForm = [
      <Grid key={1} container>

      <Grid item xs={12} md={12}  sx={{ pl:1, pr:1, display:"flex", pb:1}} >
        {displayPrincipalBalanceOf} 
      </Grid>
      <Grid item xs={12} md={6}  sx={{ pl:1, pr:1}} >
        <Box sx={{backgroundColor:"", borderRadius: 1, pt:0.5,pb:0.5,pl:1, pr:1,mb:1, border:"1px solid #ca7a0a"}} >
          <Grid container>
            <Grid item xs={4} >

              <Typography variant="subtitle2" color="#6d6d6d" sx={{m:0, mr:2, p:0, border:"0px solid #ca7a0a", float:"left"}}>
              Wallet Principal:
              </Typography>
            </Grid>
            <Grid item xs={8} >

                <Typography variant="subtitle2" color="#ca7a0a" sx={{m:0, p:0, border:"0px solid #ca7a0a"}}>
                {walletPrincipal}
                </Typography>
            </Grid>
          </Grid>
        </Box>
          
      </Grid>
          <Grid item xs={12} md={3} sx={{display:"flex", pl:1, pr:1}} >
            
          <FormTextField 
                onChange={onMintNumberOfTokensChange}
                value={mintNumberOfTokens}
                label={"How Many Tokens?"} //optional
                type="text"
                helperText=""
                />  
            </Grid>
            <Grid item xs={12} md={3}  sx={{display:"flex"}} >
                    
              <Typography variant="subtitle2" align="center" color="#ca7a0a" component="p" sx={{p:1,fontStyle:"italic"}}>
              Number of Tokens should not exceed 100,000. 
              </Typography> 
            </Grid>
      </Grid>
  
    ] ;

  }

  var displayMainMint = [

      <Paper elevation={0} key={1} sx={{ backgroundColor:"#673e05" ,border:"0px solid #f9c57d", borderRadius:2, m:"auto", mt:2, mb:2, width:"85%", p:2,  justifyContent:"center"}} >      
          <ShowError errorMsg={errorMsg}/>
        <Box sx={{ backgroundColor:"#fdf0de",  p:2, display:"flex", mb:1, borderRadius:2, fontStyle:"bold"}}>
          
            {displayForm}
        </Box>

        <Grid container>
            <Grid item xs={4} sx={{display:"flex", pl:1, pr:1, justifyContent:"right"}} >

              </Grid>
              <Grid item xs={4} sx={{display:"flex", pl:1, pr:1}} >
                <Button key={1}  variant="contained" onClick={() => { clickMintMBs(); }} sx={{ m:"auto", display:"flex", width:"300px"}}>
                      Mint
                </Button>

              </Grid>
            <Grid item xs={4} sx={{display:"flex", pl:1, pr:1, justifyContent:"right"}} >

                <Tooltip key={1}  title="Learn more about how to get your Wallet Principal for minting" placement="top" enterNextDelay={300}>
                <IconButton
                      edge="start"
                      color="inherit"
                      aria-label={props.tooltip}
                      onClick={() => { props.mainNavClick("mintHow")} }
                      sx={{
                      }}
                  >
                    <HelpOutlineIcon sx={{color:"#fdf0de"}}/> 
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

    </Paper>


  ] ;

  if (isChecking) {

    displayMainMint = [

        <Paper elevation={0} key={1} sx={{p:6, backgroundColor:"#673e05" ,border:"0px solid #f9c57d", borderRadius:2, m:"auto", mt:2, mb:2, width:"85%", p:2,  justifyContent:"center"}} >      
              

          <Typography variant="h4" align="center" color="#ffffff" component="p" sx={{p:2,fontStyle:"bold"}}>
          Loading ... 
          </Typography>

          <LinearProgress sx={{m:6,mt:2}}/>

      </Paper>

    ] ;


  } else if (isMinting) {

    displayMainMint = [

        <Paper elevation={0} key={1} sx={{p:6, backgroundColor:"#673e05" ,border:"0px solid #f9c57d", borderRadius:2, m:"auto", mt:2, mb:2, width:"85%", p:2,  justifyContent:"center"}} >      
              

          <Typography variant="h4" align="center" color="#ffffff" component="p" sx={{p:2,fontStyle:"bold"}}>
          Minting MBs now ...
          </Typography>

          <LinearProgress sx={{m:6,mt:2}}/>

      </Paper>


    ] ;
} else if (isMinted) {

    displayMainMint = [

        <Paper elevation={0} key={1} sx={{ p:6, backgroundColor:"#673e05" ,border:"0px solid #f9c57d", borderRadius:2, m:"auto", mt:2, mb:2, width:"85%", p:2,  justifyContent:"center"}} >      
              

          <Typography variant="h4" align="center" color="#ffffff" component="p" sx={{p:2,fontStyle:"regular"}}>
          You have successfully minted {mintNumberOfTokens} MB tokens!
          </Typography>
          {/* <Typography variant="h7" align="center" color="#ffffff" component="p" sx={{p:2,fontStyle:"regular"}}>
          Please check your wallet to confirm. 
          </Typography> */}
          <Typography variant="h7" align="center" color="#ffffff" component="p" sx={{p:2,fontStyle:"regular"}}>
          Contact us if you have any issues, or you think anything went wrong ...
          </Typography>

          <Grid container>
            <Grid item xs={4} sx={{display:"flex", pl:1, pr:1, justifyContent:"right"}} >

              </Grid>
              <Grid item xs={4} sx={{display:"flex", pl:1, pr:1}} >
                <Button key={1}  variant="contained" onClick={() => { resetMint(); }} sx={{ m:"auto", display:"flex", width:"300px"}}>
                    Mint more MBs
              </Button>

              </Grid>
            <Grid item xs={4} sx={{display:"flex", pl:1, pr:1, justifyContent:"right"}} >

                <Tooltip key={1}  title="Learn more about how to get your Wallet Principal for minting" placement="top" enterNextDelay={300}>
                <IconButton
                      edge="start"
                      color="inherit"
                      aria-label={props.tooltip}
                      onClick={() => { props.mainNavClick("mintHow")} }
                      sx={{
                      }}
                  >
                    <HelpOutlineIcon sx={{color:"#fdf0de"}}/> 
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
      </Paper>


    ] ;
} // end if is minting
  return (
    <Paper elevation={0} sx={{border:"0px solid #f9c57d", pb:4, backgroundColor: "#f3920c",border:"1px solid #f9c57d", borderRadius:2, justifyContent:"right",
          backgroundImage: {
            xs: ``,
            sm: ``,
          } ,
          backgroundRepeat: `no-repeat`,
          backgroundPositionX:"50%",
          backgroundPositionY:"100px",
          }} >
      <Grid container>
        <Grid item xs={12} >
          


          <Box elevation={0} sx={{  border:"0px solid #f9c57d", borderRadius:2, m:"auto", mt:2, mb:2,  p:2,  justifyContent:"center"}} >      
              
              <img
                  src={
                  "mbtMain.png"
                  }
                  srcSet={"mbtMain.png?"}
                  alt="MBs Logo"
                  loading="lazy"
                  style={{ width:"100%"}}
                  />
          </Box>

        </Grid>
              <Grid item xs={12}>

                <Box
                component="img"
                sx={{backgroundColor:"transparent", p:1}}
                src="ic-badge.svg"
                alt="Dfinity"
                />
                </Grid>
      <Grid item xs={12} sx={{ display:"flex"}}> 
      
      <Paper elevation={0} sx={{ backgroundColor: "#f3920c", borderBottom:"0px solid #f9c57d", borderRadius:0,m:2, p:2, mb:0, flexGrow:1 }} >
            <Grid container cellSpacing={2}>
                
              <Grid item xs={12}>
                  <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="#673e05"
                  
                  sx={{
                  fontSize: {
                  xs: "1em",
                  sm: "2em",
                  }
                  , fontWeight:"bold"
                  , p:2, pb:0
                  }}
                  >
                  Mint Motoko Bootcamp Tokens (MBs)
                  </Typography>

              </Grid>
              <Grid item xs={12}>
                  <Typography
                  component="p"
                  variant="subtitle2"
                  align="center"
                  color="#673e05"
                  
                  sx={{
                  fontSize: {
                  xs: ".8em",
                  sm: ".8em",
                  }
                  , fontWeight:"bold"
                  , fontStyle: "italic"
                  , p:2, pb:0
                  }}
                  >
                  {/* {(isChecking ? "..." : Math.round((Number(totalSupply)/100000000)).toLocaleString("en-US") + " MBs minted ")}  */}
                  </Typography>

              </Grid>
            </Grid>
          </Paper>
        
        </Grid>
        <Grid item xs={12} >

      
        {displayMainMint}

        </Grid> 
        <Grid item xs={12} >

        <Typography variant="h7" align="left" color="#673e05" align="center" component="p" sx={{p:2}}>
        <RocketLaunchIcon  sx={{ color: "#673e05" }}/> Learn Motoko Now, because the Internet Computer needs YOU!
        </Typography>

        <Typography variant="subtitle2" align="center" color="#673e05" component="p" sx={{p:2}}>
          MBs are to be used during the bootcamp and all tokens have NO value other than to help you learn.
        </Typography>
      

        </Grid>
        </Grid>

    </Paper>

  );
}// end MintTop

export default MintTop;

const ShowError = (props) => {
  
  const errorMsg = props.errorMsg;

  if (errorMsg) {
    return (
      <>
      <Paper sx={{bgcolor: "#fedadd", mb:3, mt:2}} elevation={5}>
        <Typography variant="h6" color="primary.contrastText" align="center" >
        {errorMsg}
        </Typography>
      
      </Paper>
      </>

    )
  }
  return (
    <></>
  )
} //end ShowError