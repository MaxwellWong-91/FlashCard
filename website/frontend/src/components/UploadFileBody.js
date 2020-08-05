import React, {useState} from "react";
import axios from "axios";
import AddCardList from "./AddCardList";
import PublishIcon from '@material-ui/icons/Publish';
import LoadingSpinner from "../images/LoadingSpinner.svg";
import "../css/components/UploadFileBody.css";


function UploadFileBody({title}) {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [file, setFile] = useState(null);
  const [sets, setSets] = useState([]);

  const handleGenerateFlashcards = (e) => {
    if (file) {
      setLoadingStatus("loading");
      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var file = fileLoadedEvent.target.result;

        var data = {
          data: file,
        }

        axios.post("/api/process", data)
          .then((res) => {
            setSets(res.data);
            setLoadingStatus("done");
          })
          .catch((err) => {
            console.log(err);
          })

      }

      fileReader.readAsDataURL(file);
    } else {
      console.log("no file")
    }
  }

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <>
      <div>
        <h2 className="create-set-subheading">Upload File</h2>
      </div>
      <div>
        <h4 className="create-set-description">File Guidelines</h4>
      </div>
      <div className="file-guidelines-container bg-white">
        <ul>
          <li>
            Files must have extension .jpg. No other extensions are currently supported
          </li>
          <li>
            File must contain a numbered list of word-definition pairs
          </li>
          <li>
            The syntax for each pair is as follows:
            <ul>
              <li>
                For <strong>single-digit numbers,</strong> the syntax is "1. word:definition"
                <ul>
                  <li>There must be one space after the period.</li>
                  <li>There must be a colon after the word, followed by a space</li>
                </ul>
              </li>

              <li>
                For <strong>double-digit numbers,</strong> the syntax is "12.word:definition"
                <ul>
                  <li>There must not be a space after the period</li>
                </ul>
              </li>

              <li><strong>Triple-digit numbers</strong> and higher are currently not supported</li>
              <li><strong>Multi-page files</strong> are currently not supported</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="file-upload-container bg-white">
        {/* <a className="file-upload-button">File Upload <PublishIcon /></a> */}
        <label className="file-upload-label">
            <span className="file-upload-button">File Upload <PublishIcon /></span>
            <input className="file-upload-input" type="file" onChange={handleFileUpload} style={{visibility: "hidden"}}></input>
        </label>
        <span className="file-uploaded">{file && file.name}</span>
      </div>
      
      <a className="pill-primary generate-flashcards-button" onClick={handleGenerateFlashcards}>Generate Flashcards</a>

      {
        loadingStatus === "loading" ? 
        <div>
          <img src={LoadingSpinner} className="loading-spinner"></img>
          <h2 className="">Creating Your flashcards...</h2>
        </div>
        : null
      }

      {
        loadingStatus === "done" ?
        <>
          <div>
            <h2 className="create-set-subheading">Make Changes</h2>
          </div>
          <AddCardList generatedFlashcards={sets} title={title}/>
        </> :
        null
      }
    </>
  )
}

export default UploadFileBody;