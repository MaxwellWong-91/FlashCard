import React, {useState, useEffect} from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import "../css/components/WordList.css";


function WordList({ flashcards, handleEditSubmit, handleDeleteClick, isOwner }) {
  const [editedCard, setEditedCard] = useState({});
  
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

  return(
    <>
      <ul className="word-list-container">
      {
        Object.values(flashcards).map((flashcard) => {
          let isEditCard = flashcard._id === editedCard._id;

          return (
            <li>
              <ul className="word-container bg-white">
                <li className="word">
                  { 
                    isEditCard ?
                    <TextField 
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
                          // Insert update call
                          handleEditSubmit(editedCard);
                          setEditedCard({});
                        }}
                      />
                      : <EditIcon 
                      onClick={(e) => setEditedCard(flashcard)}/>
                    }
                    <DeleteIcon onClick={(e) => deleteCard(e, flashcard._id)}/>
                  </li>
                  : null
                }
              
              </ul>
            </li>

          )
        })
      }
      </ul>

      <a className="nav-pill-secondary add-card-button">Add Card</a>

    </>
  )
}

export default WordList;