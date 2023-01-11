
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



const SectionDivider = (props) => {
  
const styles = {
  paperContainer: {
      backgroundImage: `url('')` ,
      backgroundRepeat: `no-repeat`,
  }
};

    var theHeight = props.theHeight ? props.theHeight : "130px" ;
    
    //console.log ("theHeight: ", theHeight);
    
    return (
      
      <Box ref={props.refProp} sx={{height:{xs:"30px", sm:theHeight}, color:"#fff"}} style={styles.paperContainer}>
        
      </Box>
    );
  }// end SectionDivider

  export default SectionDivider ;
  