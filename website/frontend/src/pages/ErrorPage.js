import React, {useState} from "react";
import Navbar from "../components/Navbar";

function ErrorPage({history}) {
  return(
    <>
      <Navbar history={history}/>
      <ErrorBody />
    </>
  )
}