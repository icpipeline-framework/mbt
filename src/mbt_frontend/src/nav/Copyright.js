
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = (props) => {
    return (
      <Typography variant="body2" color="#fee5bd" align="center" sx={{pt:4}}>
      <Link  color="inherit" style={{ textDecoration: 'none', cursor:"pointer" }} onClick={() => { props.mainNavClick("website")}} >
       
        {' Copyright © '}
          Motoko Bootcamp Token January  
        {' '}
        {new Date().getFullYear()}
        {'. '}
        </Link>
      </Typography>
    );
  }// end Copyright

  export default Copyright ;
  