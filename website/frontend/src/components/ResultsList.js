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


function ResultsList({isSearch, initialSets}) {
  const {user, setUser} = useContext(UserContext);
  const [sets, setSets] = useState(initialSets ? initialSets : []);
  const [editSet, setEditSet] = useState({});
  const [index, setIndex] = useState(null);
  
  useEffect(() => {
    if (!isSearch) {
      const headers = {
        "x-auth-token": user
      }
  
      axios.get("/api/set/", {headers})
        .then((res) => {
          setSets(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    
  }, []);

  useEffect(() => {
    if (initialSets && initialSets.length) {
        setSets([...initialSets]);
    }
  }, [initialSets]);

  const handleEditClick = (e, set) => {
    e.stopPropagation();
    e.preventDefault();
    setEditSet(set);
  }

  const handleSaveClick = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    const headers = {
      "x-auth-token": user
    }

    const data = {
      name: editSet.name
    }

    axios.patch("/api/set/update/" + editSet._id, data, {headers})
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          let newSets = [...sets];
          newSets[id].name = res.data.name;
          setSets(newSets);
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
                      <p>by {set.user}</p> 
                      :
                      <div className="icon-container">
                        {
                          isEditSet ? 
                          <IconButton onClick={(e) => handleSaveClick(e, idx)}>
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
    </ul>
  )
}

export default ResultsList;