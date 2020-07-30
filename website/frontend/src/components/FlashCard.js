import React, {useState, useEffect} from "react";
import ProgressBar from "./ProgressBar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import "../css/components/FlashCard.css";

function FlashCard({ flashcards, setName }) {
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isWord, setIsWord] = useState(true);

  const handleLeftClick = (e) => {
    if (currentCardIdx === 0) {
      return;
    } else {
      setCurrentCardIdx(currentCardIdx => currentCardIdx - 1);
    }
  }

  const handleRightClick = (e) => {
    if (currentCardIdx === flashcards.length - 1) {
      return;
    } else {
      setCurrentCardIdx(currentCardIdx => currentCardIdx + 1);
    }
  }

  return (
    <>
      <div>
        <h3 className="flashcard-title">{setName}</h3>
      </div>
      <div className="flashcard-container">
        <div className="scene" style={{width: "100%"}}>
          <ProgressBar percent={((currentCardIdx + 1)/flashcards.length) * 100 }/>
          <div className="flashcard bg-white">
            {
              isWord ?
              <p className="flashcard-face flashcard-word">{ flashcards[currentCardIdx] && flashcards[currentCardIdx].word }</p> :
              <p className="flashcard-face flashcard-definition">{ flashcards[currentCardIdx] && flashcards[currentCardIdx].definition }</p>
            }
          </div>      
        </div>

        <div className="flashcard-button-container">
          <div className="flashcard-control-container bg-white">
            <ArrowBackIcon onClick={handleLeftClick}/>
            <a onClick={(e) => setIsWord(isWord => !isWord)}>Flip</a>
            <ArrowForwardIcon onClick={handleRightClick}/>
          </div>
          <a onClick={(e) => setCurrentCardIdx(0)}>Reset</a>
        </div>
      </div>
    </>
  )
}

export default FlashCard;