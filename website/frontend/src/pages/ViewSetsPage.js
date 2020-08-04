import React, {useState} from "react";
import Navbar from "../components/Navbar";
import ViewSetsBody from "../components/ViewSetsBody";


function ViewSetsPage({history}) {
  return (
    <>
      <Navbar history={history}/>
      <ViewSetsBody />
    </>
  )
}

export default ViewSetsPage;