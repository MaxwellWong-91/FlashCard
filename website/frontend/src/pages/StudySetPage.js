import React, {useState, useEffect, useContext} from "react";
import {UserContext, UserNameContext} from "../context/UserContext";
import { useParams} from "react-router";
import axios from "axios";
import Navbar from "../components/Navbar";
import FlashCard from "../components/FlashCard";
import WordListBody from "../components/WordListBody";



function StudySetPage({history}) {
  const {user, setUser} = useContext(UserContext);
  const {username, setUsername} = useContext(UserNameContext);
  const [flashcards, setFlashcards] = useState({});

  const [setName, setSetName] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [resUser, setResUser] = useState("");

  let { setId } = useParams();
  
  useEffect(() => {
    axios.get("/api/set/" + setId)
      .then((res) => {
        setFlashcards(res.data.flashcards);
        setSetName(res.data.name);
        setResUser(res.data.user);
        setIsOwner(res.data.user === username);
      })
      .catch((err) => {
        console.log(err);
      })
    
  }, [])

  useEffect(() => {
    setIsOwner(resUser === username);
  }, [username])

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
      <Navbar history={history}/>
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