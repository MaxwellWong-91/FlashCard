import React, {useState} from "react";
import Navbar from "../components/Navbar";
import FlashCard from "../components/FlashCard";
import WordListBody from "../components/WordListBody";


function StudySetPage() {
  return(
    <>
      <Navbar />
      <FlashCard />
      <WordListBody />
    </>
  )
}

export default StudySetPage;