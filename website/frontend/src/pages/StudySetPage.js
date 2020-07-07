import React, {useState, useEffect} from "react";
import { useParams} from "react-router";
import axios from "axios";
import Navbar from "../components/Navbar";
import FlashCard from "../components/FlashCard";
import WordListBody from "../components/WordListBody";


function StudySetPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  let { setId } = useParams();

  useEffect(() => {
    console.log(setId)
    axios.get("/api/set/" + setId)
      .then((res) => {

      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const handleEditClick = (e) => {

  }

  const handleDeleteClick = (e) => {
    
  }

  return(
    <>
      <Navbar />
      <FlashCard />
      <WordListBody />
    </>
  )
}

export default StudySetPage;