import React, {useState} from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import "../css/components/WordList.css";


function WordList() {
  const handleEditClick = (e) => {
    console.log("Time to Edit");
  }

  const handleDeleteClick = (e) => {
    console.log("Time to Delete");
  }

  return(
    <>
      <ul className="word-container">
        <li className="word">
          <p>Word</p>
        </li>
        <li className="definition">
          <p>Lorem idivsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </li>
        <li className="edit-words">
          <EditIcon />
          <DeleteIcon />
        </li>
      </ul>
    </>
  )
}

export default WordList;