import React, {useState} from "react";
import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";


function SignupPage({history}) {
  return (
    <>
      <Navbar history={history}/>
      <SignupForm />
    </>
  )
}

export default SignupPage;