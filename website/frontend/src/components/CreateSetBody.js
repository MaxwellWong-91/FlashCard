import React, {useState} from "react";
import AddCardList from "./AddCardList";
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import UploadFileBody from "./UploadFileBody";
import {makeStyles} from "@material-ui/core/styles";
import "../css/components/CreateSetBody.css";

const useStyles = makeStyles({
  root: {
  },
});


function CreateSetBody({history}) {
  const [upload, setUpload] = useState(false);
  const [diy, setDiy] = useState(false);
  const [checkedId, setCheckedId] = useState("");
  const [title, setTitle] = useState("");

  const handleCheckClick = (e) => {
    if (e.target.id === checkedId) {
      setCheckedId("");
    }
    else {
      setCheckedId(e.target.id);
    }
  }

  return (
    <>
      <div>
        <h1 className="create-set-heading">Create Your Set</h1>
      </div>
      <div>
        <h4 className="create-set-description">Enter the title of the set</h4>
        <div className="create-set-title-input-container bg-white">
          <TextField
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            error={title === ""}
            helperText={title === "" ? "Please make sure field is filled out" : ""}
          />
        </div>
      </div>

      <div>
        <h4 className="create-set-description">Choose from one of the options to create your flashcards</h4>
      </div>

      <div className="options-container">
        <div className="options-container-item bg-white">
          <Checkbox id="upload-option" checked={checkedId === "upload-option"} checkedIcon={<ClearIcon />} onClick={handleCheckClick}/>
          <p>Upload File</p>
        </div>
        <div className="options-container-item bg-white">
          <Checkbox id="diy-option" checked={checkedId === "diy-option"} checkedIcon={<ClearIcon />} onClick={handleCheckClick}/>
          <p>Do it Yourself</p>
        </div>
      </div>

      {
        checkedId === "upload-option" ? 
        <UploadFileBody title={title} history={history}/> :
        null
      }

      {
        checkedId === "diy-option" ?
        <>
          <div>
            <h2 className="create-set-subheading">Do it Yourself</h2>
          </div>
          <AddCardList title={title} history={history}/>
        </> :
        null
      }
      
     

    </>
  )
}

export default CreateSetBody;