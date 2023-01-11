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
          What are MBTs?
        </Typography>

        <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:0, pb:1, borderBottom :"0px solid #f9c57d", fontStyle:"regular"}}>
          They are <b>M</b>otoko <b>B</b>ootcamp <b>T</b>okens created specifically for the January 2023 Motoko Bootcamp and will be used by participants around the globe to facilitate the tokenmagic inclusive in their bootcamp projects.
        </Typography>

        <Typography variant="h5" align="left" color="text.primary" component="p" sx={{pt:0, pb:4, borderBottom :"1px solid #f9c57d", fontStyle:"regular"}}>
          We chose the 
        <Link
                color="text.primary"
                underline="hover"
                onClick={() => { props.mainNavClick("icrc1")}}
                sx={{ml:1, mr:1, cursor:"pointer"}}
              >ICRC1 
              </Link>token standard.
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

      </Box>

      

    </Paper>

  );
} // end MintWhat

export default MintWhat;