import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../context/UserContext";
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
  const {user, setUser} = useContext(UserContext);
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
  const [isOwner, setIsOwner] = useState(true);
  let { setId } = useParams();
  
  useEffect(() => {
    axios.get("/api/set/" + setId)
      .then((res) => {
        setFlashcards(res.data.flashcards);
        setSetName(res.data.name)
      })
      .catch((err) => {
        console.log(err);
      })
    
  }, [])

  const handleDoneSubmit = (flashcard) => {
    /*
    if (flashcard._id === -1) {
      console.log("add")
      axios.post("/api/set/" + setId + "card/create")
        .then()

    } else {
      setEditedCard(flashcard);
      setFlashcards({...flashcards, [flashcard._id]: flashcard});
    }
    */
    setEditedCard(flashcard);
    setFlashcards({...flashcards, [flashcard._id]: flashcard});
  }

  const handleDeleteClick = (e, _id) => {
    let cardContainer = e.currentTarget.parentElement.parentElement.parentElement;

    const headers = {
      "x-auth-token": user
    }

    axios.delete("/api/set/" + setId + "/card/delete/" + _id, {headers})
      .then((res) => {
        cardContainer.style.animationPlayState = "running";
        cardContainer.addEventListener("animationend", () => {
          cardContainer.remove();
          let newFlashcards = flashcards;
          delete newFlashcards[_id];
          setFlashcards(newFlashcards);
        })
      })
      .catch((err) => {
        console.log(err);
      })
    
  }

  const handleAddCardClick = (e) => {
    setFlashcards({...flashcards, "-1": {_id: -1, word: '', definition: ''}});
  }

  return(
    <>
      <Navbar />
      <FlashCard 
        flashcards={flashcards}
        editedCard={editedCard}
        setName={setName}
      />
      <WordListBody 
        flashcards={flashcards}
        handleDoneSubmit={handleDoneSubmit}
        handleDeleteClick={handleDeleteClick}
        handleAddCardClick={handleAddCardClick}
        isOwner={isOwner}
      />
    </>
  )
}

export default StudySetPage;