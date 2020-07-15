import React, {useState} from "react";
import WordList from "./WordList";
import "../css/components/WordListBody.css";

function WordListBody({ flashcards, handleEditSubmit, handleDeleteClick, isOwner }) {
  return(
    <>
      <div>
        <h4 className="word-list-heading">{Object.keys(flashcards).length} cards in this set</h4>
      </div>
      <WordList 
        flashcards={flashcards}
        handleEditSubmit={handleEditSubmit}
        handleDeleteClick={handleDeleteClick}
        isOwner={isOwner}
      />
    </>
  )
}

export default WordListBody;