import React, {useState, useEffect} from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import {makeStyles} from "@material-ui/core/styles";
import "../css/components/WordList.css";


const useStyles = makeStyles({
  root: {
    marginTop: "1rem",
    marginBottom: "1rem",
    paddingRight: "0.5rem"
  },
});

function WordList({ flashcards, handleDoneSubmit, handleDeleteClick, handleAddCardClick, isOwner }) {
  const classes = useStyles();
  const [editedCard, setEditedCard] = useState({});
  const [addingCard, setAddingCard] = useState(false);
  const handleCardChange = (e) => {
    setEditedCard({ ...editedCard, [e.target.name]: e.target.value});
  };

  const deleteCard = (e, cardId) => {
    // should proabbly do the deleting here
    let cardContainer = e.currentTarget.parentElement.parentElement.parentElement;
    
    handleDeleteClick(cardId);
    
    cardContainer.style.animationPlayState = "running";
    cardContainer.addEventListener("animationend", () => {
      cardContainer.remove();
    })
  }

  return (
    <>
      <ul className="word-list-container">
      {
        Object.values(flashcards).map((flashcard) => {
          let isEditCard = flashcard._id === editedCard._id || flashcard._id  === -1; // flashcard._id === null for adding card

          return (
            <li>
              <ul className="word-container bg-white">
                <li className="word">
                  { 
                    isEditCard ?
                    <TextField
                      classes={{root: classes.root}}
                      name="word" 
                      label="Word" 
                      multiline={true} 
                      fullWidth={true} 
                      value={editedCard.word}
                      onChange={handleCardChange} 
                    /> :
                    <p>{flashcard.word}</p>
                  }
                </li>
                <li className="definition">
                  { 
                    isEditCard ?
                    <TextField
                      classes={{root: classes.root}}
                      name="definition" 
                      label="Definition" 
                      multiline={true} 
                      fullWidth={true} 
                      value={editedCard.definition}
                      onChange={handleCardChange} 
                    /> :
                    <p>{flashcard.definition}</p>
                  }
                </li>
                {
                  isOwner ? 
                  <li className="edit-words">
                    {
                      isEditCard ?
                      <DoneIcon 
                        onClick={(e) => {
                          if (editedCard._id === -1) { // If adding card, should set addingCard to false.
                            setAddingCard(false);
                          }
                          
                          // Insert update call
                          handleDoneSubmit(editedCard);
                          setEditedCard({});
                        }}
                      />
                      : <EditIcon 
                        onClick={(e) => {
                          if (!addingCard) {
                            setEditedCard(flashcard);
                          }
                      }}/>
                    }
                    <DeleteIcon onClick={(e) => {
                      // if you are deleting the card that you added, set adding card to false and edited card to nothing
                      if (addingCard && flashcard._id === -1) {
                        setAddingCard(false);
                        setEditedCard({});
                      }

                      deleteCard(e, flashcard._id);
                      }}/>
                  </li>
                  : null
                }
              
              </ul>
            </li>

          )
        })
      }
      </ul>
      {
        isOwner ? 
        <a 
        className="nav-pill-secondary add-card-button"
        onClick={(e) => {
          console.log(editedCard);
          if (!Object.keys(editedCard).length) {
            setAddingCard(true);
            setEditedCard({_id: -1, word: '', definition: ''});
            handleAddCardClick(e);
          }
        }}>Add Card</a>
        : null
      }

    </>
  )
}

export default WordList;