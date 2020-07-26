import React, {useState, useContext} from "react";
import {UserContext} from "../context/UserContext";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";
import "../css/components/WordList.css";
import "../css/components/AddCardList.css";


const useStyles = makeStyles({
  root: {
    marginTop: "1rem",
    marginBottom: "1rem",
    paddingRight: "0.5rem"
  },
});

function AddCardList({ generatedFlashcards, title, history }) {
  const classes = useStyles();
  const {user, setUser} = useContext(UserContext);
  const [flashcards, setFlashcards] = useState(generatedFlashcards ? generatedFlashcards : []);
  const [error, setError] = useState("");
  
  const handleDeleteCard = (e, idx) => {
    // should proabbly do the deleting here
    let newFlashcards = [...flashcards];
    newFlashcards.splice(idx, 0);
    setFlashcards(newFlashcards);

    let cardContainer = e.currentTarget.parentElement.parentElement.parentElement;
    
    cardContainer.style.animationPlayState = "running";
    cardContainer.addEventListener("animationend", () => {
      cardContainer.remove();
    })
  }


  const handleCardChange = (e, idx, propToChange) => {
    let newFlashcards = [...flashcards];

    newFlashcards[idx] = { ...newFlashcards[idx], [propToChange]: e.target.value };
    setFlashcards(newFlashcards);
  };

  const handleAddCard = (e) => {
    setFlashcards([...flashcards, {
      word: "",
      definition: ""
    }]);
  };

  const handleCreateSet = (e) => {
    const empty = flashcards.filter(card => card.word === "" || card.definition === "");

    if (empty.length > 0 && flashcards.length !== 0) {
      setError("Please make sure all cards are filled in")
    } else {
      const data = {
        name: title,
        flashcards: flashcards
      }

      const headers = {
        "x-auth-token": user
      }
      console.log(user)
      axios.post("/api/set/create", data, {headers})
        .then((res) => {
          if (res.data.error) {
            setError(res.data.error)
          } else {
            //history.push
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }
  
  return (
    <>
      <ul className="word-list-container">
      {
        flashcards.map((flashcard, idx) => {
          return (
            <li>
              <ul className="word-container word-container-create bg-white">
                <li className="word">
                  <TextField
                    classes={{root: classes.root}} 
                    name={`${flashcard.word}_id_${idx}`}
                    label="Word" 
                    multiline={true} 
                    fullWidth={true} 
                    value={flashcard.word}
                    onChange={(e) => handleCardChange(e, idx, "word")} 
                  /> 
                  
                </li>
                <li className="definition">
                  <TextField
                    classes={{root: classes.root}}
                    name={`${flashcard.definition}_id_${idx}`}
                    label="Definition" 
                    multiline={true} 
                    fullWidth={true} 
                    value={flashcard.definition}
                    onChange={(e) => handleCardChange(e, idx, "definition")}
                  />
                </li>
                
                <li className="edit-words">
                  <DeleteIcon onClick={(e) => handleDeleteCard(e, idx)} />
                </li>
              
              </ul>
            </li>

          )
        })
      }
      </ul>
      <div className="create-set-button-container">
        <a className="nav-pill-secondary grid-button-1" onClick={handleAddCard}>Add Card</a>
        <a className="nav-pill-primary grid-button-2" onClick={handleCreateSet}>Create Set</a>
      </div>
      {
        error ? 
        <div classname="add-card-error-container">
          <p className="add-card-error">{error}</p> 
        </div> :
        null
      }

    </>
  )
}

export default AddCardList;