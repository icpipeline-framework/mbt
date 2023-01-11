import React, { useState } from 'react';

import TextField from '@mui/material/TextField';


const FormTextField = (props) => {
    
    if (props.disabled) {
        return (
                
                <TextField
                    disabled 
                    onChange={props.onChange}
                    value={props.value}
                    label={props.label} //optional
                    helperText={props.helperText}
                    multiline={props.multiline}
                    variant="outlined"
                    type={props.type}
                    name={props.name}
                    rows={props.propsRows}
                    onKeyPress={props.onKeyPress}
                        color="secondary"
                    sx={{mb:2, flexGrow:1, backgroundColor:"#fdf0de", borderRadius:1}}
                />
                
    
        );
    }  else {

        if (props.propsRows > 0 ) {

            return (
                    
                    <TextField
                        onChange={props.onChange}
                        value={props.value}
                        label={props.label} //optional
                        helperText={props.helperText}
                        multiline={props.multiline}
                        variant="outlined"
                        type={props.type}
                        name={props.name}
                        rows={props.propsRows}
                        onKeyPress={props.onKeyPress}
                        color="secondary"
                        sx={{mb:2, flexGrow:1, backgroundColor:"#fdf0de", borderRadius:1}}
                    />
                    
        
            )

        } else {

            return (
                    
                    <TextField
                        onChange={props.onChange}
                        value={props.value}
                        label={props.label} //optional
                        helperText={props.helperText}
                        multiline={props.multiline}
                        variant="outlined"
                        type={props.type}
                        name={props.name}   
                        // rows={props.rows}
                        onKeyPress={props.onKeyPress}
                        color="secondary"
                        sx={{mb:2, flexGrow:1,  backgroundColor:"#fdf0de", borderRadius:1}}
                    />
                    
        
            )

        } 

        }// end if disabled 
}


export default FormTextField;