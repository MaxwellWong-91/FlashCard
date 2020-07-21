import React, {useState} from "react";
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

/* 

*/
function AddCardList({ generatedFlashcards }) {
  const classes = useStyles();
  const [flashcards, setFlashcards] = useState(generatedFlashcards ? generatedFlashcards : []);
  
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
        <a className="nav-pill-primary grid-button-2">Create Set</a>
      </div>

    </>
  )
}

export default AddCardList;