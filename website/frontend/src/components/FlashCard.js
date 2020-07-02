import React, {useState} from "react";
import ProgressBar from "./ProgressBar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import "../css/components/FlashCard.css";

function FlashCard() {
  return (
    <>
      <div>
        <h3 className="flashcard-title">Name of Set</h3>
      </div>
      <div className="flashcard-container">
        <div className="scene" style={{width: "100%"}}>
          <ProgressBar />
          <div className="flashcard">
            <p className="flashcard-face flashcard-word">Word</p>
            <p className="flashcard-face flashcard-definition">Lorem idivsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>      
        </div>

        <div className="flashcard-button-container">
          <div className="flashcard-control-container">
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