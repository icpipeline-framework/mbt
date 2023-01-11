import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';


// **** CUSTOM IMPORTS


const styles = {
  paperContainer: {
      backgroundImage: `url(${"pipe-edges-bw.png"})` ,
      backgroundRepeat: "repeat-y",
      backgroundPosition: `30%`,
  }
};

const MintHow = (props) => {

  console.log ("MintHow RENDERED______")

  var icrc1Canisterid = "aaaaa-aaaaa-aaaaa-aaaaa-aaa"


  return (

    <Paper  elevation={0} sx={{ borderRadius:2, backgroundColor: "#f3920c", pt:2, pb:2, border:"1px solid #f9c57d", }}>
      {/* Hero unit */}
      
      

      <Box  component="main" sx={{ border: "1px solid #f9c57d", borderRadius:2,  m: { xs:2, sm:4} ,  p: { xs:2, sm:4} }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="#673e05"
          gutterBottom
          sx={{
            fontSize: {
              xs: "2em",
              sm: "4em",
            }
            , fontWeight:"bold"
          }}
        >
          How does this work?
        </Typography>

        <Typography variant="h5" align="center" color="text.primary" component="p" sx={{pt:0, pb:2,fontStyle:"regular"}}>
          There is a 3 Step Process ...
        </Typography>
        <Box elevation={0} sx={{  border:"0px solid #f9c57d", borderRadius:2, m:"auto", mt:2, mb:2,  p:2, display:"flex", justifyContent:"center"}} >      
        
        <img
            src={
            "steps.png"
            }
            srcSet={"howToSteps.png?"}
            alt="Dfinity Logo"
            loading="lazy"
            style={{ display:"block", width:"90%"}}
            />
        </Box>

            <ol>
              <li>
                        
                <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:0, pb:2,fontStyle:"regular"}}>
                  Choose a Wallet (<Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("bitfinity")}}
                sx={{ml:1, mr:1, cursor:"pointer"}}
              >Bitfinity 
              </Link>, 
              <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("stoic")}}
                sx={{ml:1, mr:1, cursor:"pointer"}}
              >Stoic 
              </Link>,
              <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("nfid")}}
                sx={{ml:1, mr:1, cursor:"pointer"}}
              >NFId
              </Link>, etc.) and collect your <b>Wallet Principal</b>
                </Typography>
              </li>
              <li>        
                <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:0, pb:2,fontStyle:"regular"}}>
                  Enter your <b>Wallet Principal</b> above, choose a quantity of tokens and hit "Mint"
                </Typography>
                
              </li>
              <li>        
                <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:0, pb:0,fontStyle:"regular"}}>
                  Add the Token to your wallet if it is not already and check your balance.
                </Typography>
                <Typography variant="subtitle2" align="left" color="#673e05" component="p" sx={{pt:1, pb:2,pl:3, fontStyle:"italic"}}>
                 <b>CantisterId</b>: {icrc1Canisterid} (
                <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("icrc1")}}
                sx={{ml:1, mr:1, cursor:"pointer"}}
              >ICRC1 
              </Link>as token standard)
                </Typography>
                
              </li>
            </ol>
        <Typography variant="h7" align="center" color="#673e05" component="p" sx={{p:3, borderTop :"1px solid #f9c57d", fontStyle:"regular", display:"flex", flexDirection:"column"}}>
          If you have any issues along the way, please visit our Discord and ask for support in there.
            <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("discord")}}
                sx={{ m:3, cursor:"pointer"}}
              >
                <img
                    src={
                    "steps.png"
                    }
                    srcSet={"discord-v2.svg?"}
                    alt="Dfinity Logo"
                    loading="lazy"
                    style={{ display:"block", width:"60px"}}
                    />
              </Link>

        </Typography>
      </Box>

      

    </Paper>

  );
} // end MintHow

export default MintHow;