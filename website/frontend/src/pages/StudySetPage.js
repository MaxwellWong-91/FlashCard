import React, {useState} from "react";
import Navbar from "../components/Navbar";
import FlashCard from "../components/FlashCard";
import WordList from "../components/WordList";


function StudySetPage() {
  return(
    <>
      <Navbar />
      <FlashCard />
      <WordList />
    </>
  )
}

export default StudySetPage;