import React, {useState} from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";


function LoginPage({history}) {
  return (
    <>
      <Navbar history={history}/>
      <LoginForm />
    </>
  )
}

export default LoginPage;