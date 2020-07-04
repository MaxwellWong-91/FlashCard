import React, {useState} from "react";
import WordList from "./WordList";
import "../css/components/WordListBody.css";

function WordListBody() {
  return(
    <>
      <div>
        <h4 className="word-list-heading">2 cards in this set</h4>
      </div>
      <WordList />
    </>
  )
}

export default WordListBody;