import React, {useState, useEffect} from "react";
import ProgressBar from "./ProgressBar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import "../css/components/FlashCard.css";

function FlashCard({ flashcards, editedCard, setName }) {
  const [currentCard, setCurrentCard] = useState(Object.values(flashcards)[0]);

  useEffect(() => {
    if (currentCard._id === editedCard._id) {
      setCurrentCard(editedCard);
    }
  }, [editedCard]);
  
  return (
    <>
      <div>
        <h3 className="flashcard-title">{setName}</h3>
      </div>
      <div className="flashcard-container">
        <div className="scene" style={{width: "100%"}}>
          <ProgressBar />
          <div className="flashcard bg-white">
            <p className="flashcard-face flashcard-word">{ currentCard.word }</p>
            <p className="flashcard-face flashcard-definition">{ currentCard.definition }</p>
          </div>      
        </div>

        <div className="flashcard-button-container">
          <div className="flashcard-control-container bg-white">
            <ArrowBackIcon />
            <a>Flip</a>
            <ArrowForwardIcon />
          </div>
          <a>Reset</a>
        </div>
      </div>
    </>
  )
}

export default FlashCard;