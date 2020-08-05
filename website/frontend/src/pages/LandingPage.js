import React from "react";
import Navbar from "../components/Navbar";
import LandingBody from "../components/LandingBody";

function LandingPage({history}) {
  return (
    <>
      <Navbar history={history}/>
      <LandingBody />
    </>
  )
}

export default LandingPage;