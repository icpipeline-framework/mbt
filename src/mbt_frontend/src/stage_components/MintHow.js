import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

// **** CUSTOM IMPORTS

import AppContext from '../nav/AppContext';

const styles = {
  paperContainer: {
      backgroundImage: `url(${"pipe-edges-bw.png"})` ,
      backgroundRepeat: "repeat-y",
      backgroundPosition: `30%`,
  }
};

const MintHow = (props) => {

  console.log ("MintHow RENDERED______")

  const myContext = useContext(AppContext);
  const [isCopying, setIsCopying] = useState(false);


  var icrc1Canisterid = "db3eq-6iaaa-aaaah-abz6a-cai";

  const copyCanister = async () => {
    
    setIsCopying (true);

    //var thisExec = copyTextToClipboard(ev, "what is going on").catch(e => { alert("agghhh:"+ e )});
    navigator.clipboard.writeText(icrc1Canisterid)
    await myContext.sleep(2000);

    setIsCopying (false );
  }// end copySSH

  var displayCopy = [<ContentCopyIcon  sx={{color:'text.primary'}} />] 
  
  if (isCopying) {
    displayCopy = [<ContentCopyIcon  sx={{color:'#f9c57d'}} />] 
  }

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
          It's easy ...
        </Typography>
        <Box elevation={0} sx={{  border:"0px solid #f9c57d", borderRadius:2, mt:2, mb:2,  p:0, display:"block", justifyContent:"center"}} >      
        
        <img
            src={
            "steps.png"
            }
            srcSet={"howToSteps.png?"}
            alt="Dfinity Logo"
            loading="lazy"
            style={{ display:"block", width:"100%"}}
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
              </Link>
              {/* , 
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
              </Link>
               */}
              ) and collect your <b>Wallet Principal</b>
                </Typography>
              </li>
              <li>        
                <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:0, pb:2,fontStyle:"regular"}}>
                  Enter your <b>Wallet Principal</b> above, choose a quantity of tokens and hit "Mint"
                </Typography>
                
              </li>
              <li>        
                <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:0, pb:0,fontStyle:"regular"}}>
                  Add the MBT Token to your wallet ( if you haven't already ) and check your balance.
                </Typography>
                <Typography variant="h7" align="left" color="#673e05" component="" sx={{pt:1, pb:1,pl:3, fontStyle:"italic"}}>
                 
                <Tooltip key={1}  title="Copy the Token Canister Id to the clipboard" placement="top" enterNextDelay={300}>
                <IconButton
                      edge="start"
                      color="inherit"
                      aria-label={props.tooltip}
                      onClick={() => { copyCanister()} }
                      sx={{m:1
                      }}
                  >
                    {displayCopy}
                  </IconButton>
                  </Tooltip>
                  <b>CanisterId</b>: {icrc1Canisterid} 

                    </Typography>
                  <Typography variant="subtitle2" align="left" color="#673e05" component="" sx={{pt:0, pb:2,pl:8, fontStyle:"italic"}}>
                  NOTE: We used the 
                <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("icrc1")}}
                sx={{ cursor:"pointer"}}
              > ICRC1 
              </Link> as our token standard which you will need to designate while adding the token to your wallet. 
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