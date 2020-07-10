import React, {useState, useEffect} from "react";
import { useParams} from "react-router";
import axios from "axios";
import Navbar from "../components/Navbar";
import FlashCard from "../components/FlashCard";
import WordListBody from "../components/WordListBody";

const flashcardSets = [
  {
    _id: ("5eae0f84f8159e46bc2028c7"), 
    name: "Biology",
    __v: 0
  },
  {
    _id: ("5ac74cccc65aac3e0c4b6cde"),
    flashcards: [("507f1f77bcf86cd799439011"), ("507f191e810c19729de860ea")],
    name: "cse100",
    __v: 0
  }
]



function StudySetPage() {
  const [flashcards, setFlashcards] = useState({
    "507f1f77bcf86cd799439011":
      {
        _id: "507f1f77bcf86cd799439011",
        word: "agile", 
        definition: "software methodology",
        __v: 0
      },
    "507f191e810c19729de860ea":
    {
      _id: "507f191e810c19729de860ea",
      word: "waterfall", 
      definition: "ancient software methodology",
      __v: 0
    }
  });
  const [editedCard, setEditedCard] = useState({});
  const [setName, setSetName] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  let { setId } = useParams();
  
  useEffect(() => {
    console.log(setId);
    // axios.get("/api/set/" + setId)
    //   .then((res) => {

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    
  }, [])

  const handleEditSubmit = (flashcard) => {
    console.log(flashcard);
    setEditedCard(flashcard);
    setFlashcards({...flashcards, [flashcard._id]: flashcard});
  }

  const handleDeleteClick = (e) => {
    
  }

  return(
    <>
      <Navbar />
      <div className="background"></div>
      <FlashCard 
      flashcards={flashcards}
      editedCard={editedCard}/>
      <WordListBody 
      flashcards={flashcards}
      handleEditSubmit={handleEditSubmit}
       />
    </>
  )
}

export default StudySetPage;