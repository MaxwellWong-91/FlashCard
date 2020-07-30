import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../context/UserContext";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import "../css/components/ResultsList.css";


function ResultsList({isSearch}) {
  const {user, setUser} = useContext(UserContext);
  const [sets, setSets] = useState([]);
  const [editSet, setEditSet] = useState({});
  const [index, setIndex] = useState(null);

  useEffect(() => {
    const headers = {
      "x-auth-token": user
    }

    axios.get("/api/set/", {headers})
      .then((res) => {
        console.log(res.data);
        setSets(res.data);
        //console.log(sets);
      })
      .catch((err) => {
        console.log(err);
      })
    
  }, [])

  const handleEditClick = (e, set) => {
    e.stopPropagation();
    e.preventDefault();
    setEditSet(set);
  }

  const handleSaveClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const headers = {
      "x-auth-token": user
    }

    const data = {
      name: editSet.name
    }

    axios.patch("/api/set/" + editSet._id + "/update", data, {headers})
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setEditSet({});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleSetChange = (e) => {
    setEditSet({...editSet, [e.target.name]: e.target.value})
  }

  const handleDeleteClick = (e, id, idx) => {
    e.stopPropagation();
    e.preventDefault();
    const headers = {
      "x-auth-token": user
    }
    let item = e.currentTarget.parentElement.parentElement.parentElement;

    axios.delete("/api/set/delete/" + id, {headers})
      .then((res) => {
        console.log(res);
        console.log(res.data)
        if (res.data.error) {
          console.log(res.data.error)
        } else {
          item.style.animationPlayState = "running";
          item.addEventListener("animationend", () => {
            let newSets = [...sets];
            newSets.splice(idx, 0);
            setSets(newSets);
          })
          setEditSet({});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const stopLink = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <ul className="result-list">
      {
        sets.map((set, idx) => {
          let isEditSet = editSet._id === set._id;
          return (
            <>
              <li className="result-list-item bg-white">
                <Link className="result-list-link" to={"/set/study/" + set._id}>
                  <div className="result-list-heading">
                    {
                      isEditSet ?
                      <TextField 
                        name="name" 
                        label="Name" 
                        multiline={true} 
                        value={editSet.name}
                        error={editSet.name === ""}
                        helperText={editSet.name === "" ? "Please make sure field is filled out" : ""}
                        onChange={handleSetChange} 
                        onClick={(e) => stopLink(e)}
                      /> :
                      <p className="set-name">{set.name}</p>
                    }
                    
                    {
                      isSearch ? 
                      <p>{set.user}</p> 
                      :
                      <div className="icon-container">
                        {
                          isEditSet ? 
                          <IconButton onClick={handleSaveClick}>
                            <SaveIcon/> 
                          </IconButton> : 
                          <IconButton onClick={(e) => handleEditClick(e, set)}>
                            <EditIcon/>
                          </IconButton>
                        }
                        <IconButton onClick={(e) => handleDeleteClick(e, set._id, idx)}>
                          <DeleteIcon/>
                        </IconButton>
                      </div>
                    }

                    <div className="result-list-num-terms">
                      <p>
                        {Object.keys(set.flashcards).length} terms
                      </p>
                    </div>
                  </div>
        
                  <ul className="result-list-word-container">
                    {
                      set.flashcards.length ? 
                      set.flashcards.slice(0, 4).map((card) => {
                        return (
                          <li className="result-list-word-container-item">
                            <p>{card.word}</p>
                            <p>{card.definition}</p>
                          </li>
                        )
                      })
                      : null
                    }
                  </ul>
                </Link>
              </li>
            </>
          )

        })
      }
      {/* <li className="result-list-item">
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
      </ul> */}
    </ul>
  )
}

export default ResultsList;