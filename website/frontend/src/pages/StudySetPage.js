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
  const [flashcards, setFlashcards] = useState({});

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
    const headers = {
      "x-auth-token": user
    }

    const data = {
      word: flashcard.word,
      definition: flashcard.definition
    }

    if (flashcard._id === -1) {
      return axios.post("/api/set/" + setId + "/card/create", data, {headers})
        .then((res) => {
          if (res.data.error) {
            return Promise.reject(res.data.error);
          } 
          else {
            let newFlashcards = {...flashcards};
            delete newFlashcards[-1];
            setFlashcards({ ...newFlashcards,  [res.data.flashcard._id]: res.data.flashcard });
            return Promise.resolve();
          }
        })
        .catch((err) => {
          console.log(err);
        })

    } else {
      return axios.patch(`/api/set/${setId}/card/update/${flashcard._id}`, data, {headers})
        .then((res) => {
          if (res.data.error) {
            return Promise.reject(res.data.error);
          }
          else {
            setFlashcards({...flashcards, [flashcard._id]: flashcard});
            return Promise.resolve();
          }
        })
        .catch((err) => {
          console.log(err);
        })
      
    }
  }

  const handleDeleteClick = (e, _id) => {
    let cardContainer = e.currentTarget.parentElement.parentElement.parentElement;

    if (_id === -1) {
      cardContainer.style.animationPlayState = "running";
      cardContainer.addEventListener("animationend", () => {
        let newFlashcards = {...flashcards};
        delete newFlashcards[_id];
        setFlashcards(newFlashcards);
      });
    } 
    else {
      const headers = {
        "x-auth-token": user
      }
  
      axios.delete("/api/set/" + setId + "/card/delete/" + _id, {headers})
        .then((res) => {
          cardContainer.style.animationPlayState = "running";
          cardContainer.addEventListener("animationend", () => {
            let newFlashcards = {...flashcards};
            delete newFlashcards[_id];
            setFlashcards(newFlashcards);
          })
        })
        .catch((err) => {
          console.log(err);
        })
      }
    
  }

  const handleAddCardClick = (e) => {
    setFlashcards({...flashcards, "-1": {_id: -1, word: '', definition: ''}});
  }

  return(
    <>
      <Navbar />
      <FlashCard 
        flashcards={Object.values(flashcards)}
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