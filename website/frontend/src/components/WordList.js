import React, {useState, useEffect} from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import "../css/components/WordList.css";


function WordList({ flashcards, handleEditSubmit, handleDeleteClick }) {
  const [editedCard, setEditedCard] = useState({});
  
  const handleCardChange = (e) => {
    setEditedCard({ ...editedCard, [e.target.name]: e.target.value});
  };

  const deleteCard = (e) => {
    // should proabbly do the deleting here
    let cardContainer = e.currentTarget.parentElement.parentElement.parentElement;
    let cardId = cardContainer.getAttribute("_id");
    console.log("first")
    handleDeleteClick(cardId);
    console.log("before delete")
    cardContainer.style.animationPlayState = "running";
    cardContainer.addEventListener("animationend", () => {
      cardContainer.remove();
      console.log('hi')
    })
  }

  return(
    <>
      <ul className="word-list-container">
      {
        Object.values(flashcards).map((flashcard) => {
          let isEditCard = flashcard._id === editedCard._id;

          return (
            <li _id={flashcard._id}>
              <ul className="word-container">
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
                  <DeleteIcon onClick={deleteCard}/>
                </li>
              </ul>
            </li>

          )
        })
      }
      </ul>

    </>
  )
}

export default WordList;