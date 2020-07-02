import React, {useState} from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import "../css/components/WordList.css";


function WordList() {
  return(
    <>
      <div>
        <h4 className="word-list-heading">2 cards in this set</h4>
      </div>
      <div className="word-container">
        <div className="word">
          <p>Word</p>
        </div>
        <div className="definition">
          <p>Lorem idivsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className="edit-words">
          <EditIcon />
          <DeleteIcon />
        </div>
      </div>
    </>
  )
}

export default WordList;