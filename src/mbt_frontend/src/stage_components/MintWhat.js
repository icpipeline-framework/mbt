import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import GitHubIcon from '@mui/icons-material/GitHub';
// **** CUSTOM IMPORTS


const styles = {
  paperContainer: {
      backgroundImage: `url(${"pipe-edges-bw.png"})` ,
      backgroundRepeat: "repeat-y",
      backgroundPosition: `30%`,
  }
};

const MintWhat = (props) => {

  console.log ("MintWhat RENDERED______")

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
          What is an MB?
        </Typography>

        <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:0, pb:1, borderBottom :"0px solid #f9c57d", fontStyle:"regular"}}>
          <b>M</b>otoko <b>B</b>ootcamp tokens were created specifically for the January 2023 Motoko Bootcamp and will be used by participants around the globe to facilitate their bootcamp projects.
        </Typography>

        <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:1, pb:4, borderBottom :"1px solid #f9c57d", fontStyle:"regular"}}>
        We used NatLabs’ <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("icrc1")}}
                sx={{ml:1, mr:1, cursor:"pointer", color:"#ffc059"  , fontWeight:"bold"}}
              >ICRC1 
              </Link> implementation, so thanks and our compliments to the NatLabs team.
              <Tooltip key={1}  title="View the GitHub Repo of their implementation" placement="top" enterNextDelay={300}>

                <IconButton
                      edge="start"
                      color="text.primary"
                      aria-label={props.tooltip}
                      onClick={() => { props.mainNavClick("natlabsicrc")} }
                      sx={{ ml:1, mr:1
                      }}
                  >
                    <GitHubIcon sx={{color:"text.primary"}}/> 
                  </IconButton>
                  </Tooltip>
                
        </Typography>




      
        <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:3, pb:2,fontStyle:"regular"}}>
          The Motoko Bootcamp is expressly thankful for the ongoing support and continuous innovation provided by the Dfinity Foundation.
        </Typography>
        <Box elevation={0} sx={{  border:"0px solid #f9c57d", borderRadius:2, m:"auto", mt:2, mb:2, width:"300px", p:2, display:"flex", justifyContent:"center"}} >      
          
        <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("dfinity")}}
                sx={{ml:1, mr:1, cursor:"pointer"}}
              >
        <img
            src={
            "dinfinity.png"
            }
            srcSet={"dfinityLogo_MAIN.png?"}
            alt="Dfinity Logo"
            loading="lazy"
            style={{ display:"block", width:"300px"}}
            />
              </Link>
        </Box>

      <Grid container sx={{borderTop: "1px solid #f9c57d", p:4}}>
        <Grid item xs={12} md={8}>

          <Typography variant="h7" align="left" color="text.primary" component="p" sx={{pt:1, pb:1,fontStyle:"regular"}}>
            The MBT faucet was built for the Motoko Bootcamp by the team at <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("icpipeline")}}
                sx={{ cursor:"pointer"}}
              >ICPipeline 
              </Link>, leveraging the alpha version of <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("icpipeline")}}
                sx={{ cursor:"pointer"}}
              >ICPipeline 
              </Link>. 
          
          </Typography>
          <Typography variant="h7" align="left" color="text.primary" component="p" sx={{pt:1, pb:2,fontStyle:"regular"}}>The soon-to-be released developer tooling and services platform is going to facilitate and support individual developers, entreprenuers and established companies building on the Internet Computer.</Typography>
        </Grid>
        <Grid item xs={12} md={4}>

        <Link
                color="text.primary"
                underline="none"
                onClick={() => { props.mainNavClick("icpipeline")}}
                sx={{ml:1, mr:1, cursor:"pointer"}}
              >
            <Grid container>
              <Grid item xs={12} sx={{border:"0px solid #00ff00"}}>
                <Typography align="center" color="text.secondary" sx={{fontWeight: 'bold',pt:1, pb:.5,pl:1, m:0, lineHeight:1, fontSize:"2.5em"}} component="h4" variant="h4">
                ICPipeline
                <Typography align="center" color="text.secondary" sx={{fontSize:".2em"}}  variant="subtitle">TM</Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{display:"flex", justifyContent: "center"}}>
              <Box sx={{pt:1,
                      backgroundImage: {
                        xs: `url("logo-color-underline.png")`,
                        sm: `url("logo-color-underline.png")`,
                      } ,
                      backgroundRepeat: `no-repeat`,
                      backgroundSize:"contain", width:"220px"}} >
                </Box>
              </Grid>
            </Grid>
            </Link>
        </Grid>
      </Grid>


      </Box>

      

    </Paper>

  );
} // end MintWhat

export default MintWhat;