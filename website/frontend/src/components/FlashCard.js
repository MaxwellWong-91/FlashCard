import React, {useState, useEffect} from "react";
import ProgressBar from "./ProgressBar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import "../css/components/FlashCard.css";

function FlashCard({ flashcards, setName }) {
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  return (
    <>
      <div>
        <h3 className="flashcard-title">{setName}</h3>
      </div>
      <div className="flashcard-container">
        <div className="scene" style={{width: "100%"}}>
          <ProgressBar />
          <div className="flashcard bg-white">
            <p className="flashcard-face flashcard-word">{ flashcards[currentCardIdx] && flashcards[currentCardIdx].word }</p>
            <p className="flashcard-face flashcard-definition">{ flashcards[currentCardIdx] && flashcards[currentCardIdx].definition }</p>
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