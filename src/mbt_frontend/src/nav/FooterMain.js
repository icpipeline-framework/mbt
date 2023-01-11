import * as React from 'react';
import { useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

// **** CUSTOM IMPORTS


import Copyright from './Copyright';


const Footer= (props) => {
    
  let navigate = useNavigate();

  
  return (
      <Box
        sx={{
          border: "1px solid #000",
          borderTop:  `1px solid #824e07`,
          py: [3, 6],
          flexGrow:1,
          height:"100%",
          width:"100%",
          mb:"auto",
          backgroundColor:"#824e07"
        }}
      >
        <Container maxWidth ={"md"} >
        <Grid container >
          
          <Grid item xs={4} sx={{textAlign:"center"}}>
                  
              <Link
                color="text.primary"
                href="#"
                underline="hover"
                sx={{ my: 1, mx: 1.5 , color:"#fee5bd"}}
                onClick={() => { props.mainNavClick("website")}}
              >
                Official Website
              </Link>
            </Grid>
          
            <Grid item xs={4} sx={{textAlign:"center"}}>
                  
              <Link
                color="text.primary"
                href="#"
                underline="hover"
                sx={{ my: 1, mx: 1.5 , color:"#fee5bd"}}
                onClick={() => { props.mainNavClick("student")}}
              >
                Student Registration
              </Link>
            </Grid>
          
          <Grid item xs={4} sx={{textAlign:"center"}}>
                  
              <Link
                color="text.primary"
                href="#"
                underline="hover"
                sx={{ my: 1, mx: 1.5 , color:"#fee5bd"}}
                onClick={() => { props.mainNavClick("medium")}}
              >
                Read More about the Bootcamp
              </Link>
            </Grid>
          </Grid>
        <Copyright mainNavClick={props.mainNavClick} sx={{ mt: 5 }}  />
                <Box
                component="img"
                sx={{backgroundColor:"transparent", p:1}}
                src="ic-badge1.svg"
                alt="Dfinity"
                />
        </Container>
      </Box>
    );
  }// end Footer

  export default Footer ;
  