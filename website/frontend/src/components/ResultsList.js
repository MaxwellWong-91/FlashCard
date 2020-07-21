import React, {useState} from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import "../css/components/ResultsList.css";


function ResultsList({isSearch, sets}) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <ul className="result-list bg-white">
      <li className="result-list-item">
        <div className="result-list-heading">
          {
            isEdit ?
            <TextField 
              name="name" 
              label="Name" 
              multiline={true} 
              fullWidth={true}
            /> :
            <p className="set-name">Set Name</p>
          }
          
          {
            isSearch ? 
            <p>By KiruKirai</p> 
            :
            <div className="icon-container">
              {
                isEdit ? 
                <DoneIcon /> : 
                <EditIcon />
              }
              <DeleteIcon />
            </div>
          }
        </div>
        <div className="result-list-num-terms">
          <p>
            3 terms
          </p>
        </div>
      </li>

      <ul className="result-list-word-container">
        <li className="result-list-word-container-item">
          <p>Word Word Word Word Word WordWordWordWord</p>
          <p>Definition Definition Definition Definition Definition Definition Definition Definition Definition DefinitionDefinition Definition Definition Definition Definition Definition Definition Definition Definition Definition DefinitionDefinition</p>
        </li>

        <li className="result-list-word-container-item">
          <p>Word</p>
          <p>Definition Definition Definition Definition Definition Definition Definition Definition Definition DefinitionDefinition</p>
        </li>

        <li className="result-list-word-container-item">
          <p>Word</p>
          <p>Definition Definition Definition Definition Definition Definition Definition Definition Definition DefinitionDefinition</p>
        </li>

        <li className="result-list-word-container-item">
          <p>Word</p>
          <p>Definition Definition Definition Definition Definition Definition Definition Definition Definition DefinitionDefinition</p>
        </li>
      </ul>
    </ul>
  )
}

export default ResultsList;