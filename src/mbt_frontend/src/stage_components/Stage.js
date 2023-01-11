import React, { useRef, useContext } from 'react'

import { Route, Routes,useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import smoothscroll from 'smoothscroll-polyfill';
 
import { useLocation} from 'react-router-dom';

// **** CUSTOM IMPORTS



import MintTop from './MintTop';
import MintHow from './MintHow';
import MintWhat from './MintWhat';

import SectionDivider from '../nav/SectionDivider' ;
import FooterMain from '../nav/FooterMain';
import MainAppBar from '../nav/MainAppBar';

import AppContext from '../nav/AppContext';

const Stage = () => {
  console.log ("______ Stage RENDERED______")

  const myContext = useContext(AppContext);
  
  const refMintTop = useRef();
  const refMintHow = useRef();
  const refMintWhat = useRef();
  
// kick off the polyfill!
smoothscroll.polyfill();



let navigate = useNavigate();
let location = useLocation();



const checkLocation =  (thisLocation) => {
  let sameLocation = true ;
  if (thisLocation != location.pathname) {
    sameLocation = false ;
    navigate (thisLocation)
    
  }
  return sameLocation
} // end checkLocation


const mainNavClick =  (whereTo) => {

  console.log ("NavItems-mainNavClick - start mainNavClick");
  console.log (whereTo);
  if (whereTo == "Home") { 
  
    if ( checkLocation ("/" ) ) {
      refMintTop.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.body.scrollIntoView("alignToTop");
    }// end if check location
  } else if (whereTo == "mintHow") {
    checkLocation ("/" )
    refMintHow.current.scrollIntoView({ behavior: 'smooth' });
  } else if (whereTo == "mintWhat") {
    checkLocation ("/" )
    refMintHow.current.scrollIntoView({ behavior: 'smooth' });

  } else if (whereTo == "student") {
  
    window.open ("https://docs.google.com/forms/d/e/1FAIpQLSc-Jqiqt8hdJaa9XFX7N_j9mLmoA5pnRCz_J8H3TF1s6tRLoQ/viewform", "_blank" );

  } else if (whereTo == "website") {
  
    window.open ("https://vbcav-ayaaa-aaaap-aaova-cai.raw.ic0.app/", "_blank" );

  } else if (whereTo == "dfinity") {
  
    window.open ("https://dfinity.org/", "_blank" );
  
  } else if (whereTo == "discord") {
  
    window.open ("https://discord.gg/42f5DB3awm", "_blank" );

  } else if (whereTo == "medium") {
  
    window.open ("https://medium.com/code-state", "_blank" );

  } else if (whereTo == "icrc1") {
  
    window.open ("https://github.com/dfinity/ICRC-1/blob/main/standards/ICRC-1/README.md", "_blank" );

  } else if (whereTo == "bitfinity") {
  
    window.open ("https://wallet.infinityswap.one/", "_blank" );

  } else if (whereTo == "nfid") {
  
    window.open ("https://nfid.one/", "_blank" );

  } else if (whereTo == "stoic") {
  
    window.open ("https://www.stoicwallet.com/", "_blank" );

   


    
  } else {
    document.body.scrollIntoView("alignToTop");
  }
  
  
  


} // end handle click

  var mintDisplay = [
    <Container key={1}  ref={refMintTop} sx={{pt:8, 
      backgroundColor:"#c27409"}}>
        <SectionDivider theHeight="100px"  />
        <MintTop mainNavClick={mainNavClick} />
        <SectionDivider refProp={refMintHow}/>
        <MintHow mainNavClick={mainNavClick} />
        <SectionDivider refProp={refMintWhat}/>
        <MintWhat mainNavClick={mainNavClick} />
        <SectionDivider />
      </Container>
  ] ; /// end mintDisplay 
  
  

  return (
    <React.Fragment>
      <MainAppBar mainNavClick={mainNavClick} />
    
            <Routes>
                <Route path="/" element={mintDisplay} />
                <Route path="/mint" element={mintDisplay} />
                
            </Routes>
      <FooterMain mainNavClick={mainNavClick}  />

    </React.Fragment>
  );
} // end Stage


export default Stage;