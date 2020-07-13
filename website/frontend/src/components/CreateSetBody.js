import React, {useState} from "react";
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import "../css/components/CreateSetBody.css";
import UploadFileBody from "./UploadFileBody";

function CreateSetBody() {
  return (
    <>
      <div>
        <h1 className="create-set-heading">Create Your Set</h1>
      </div>
      <div>
        <h4 className="create-set-description">Enter the title of the set</h4>
        <div className="create-set-title-input-container bg-white">
          <TextField label="Title"/>
        </div>
      </div>

      <div>
        <h4 className="create-set-description">Choose from one of the options to create your flashcards</h4>
      </div>

      <div className="options-container">
        <div className="options-container-item bg-white">
          <Checkbox checkedIcon={<ClearIcon />}/>
          <p>Upload File</p>
        </div>
        <div className="options-container-item bg-white">
          <Checkbox checkedIcon={<ClearIcon />}/>
          <p>Do it Yourself</p>
        </div>
      </div>

      <div>
        <h2 className="create-set-subheading">Do it Yourself</h2>
      </div>

      <UploadFileBody />
    </>
  )
}

export default CreateSetBody;