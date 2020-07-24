import React, {useState} from "react";
import AddCardList from "./AddCardList";
import PublishIcon from '@material-ui/icons/Publish';
import LoadingSpinner from "../images/LoadingSpinner.svg";
import "../css/components/UploadFileBody.css";


function UploadFileBody({title}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateFlashcards = (e) => {
    setIsLoading(true);
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
            Files must have extension .pdf or .txt. No other extensions are currently supported
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
        <a className="file-upload-button">File Upload <PublishIcon /></a>
      </div>
      
      <a className="pill-primary generate-flashcards-button" onClick={handleGenerateFlashcards}>Generate Flashcards</a>

      {
        isLoading ? 
        <img src={LoadingSpinner} className="loading-spinner"></img> :
        null
      }
      

      <div>
        <h2 className="create-set-subheading">Make Changes</h2>
      </div>

      <AddCardList generatedFlashcards ={[
            {
              word: "agile", 
              definition: "software methodology"
            },
            {
              word: "waterfall", 
              definition: "ancient software methodology"
            },
            {
              word: "test",
              definition: "test test test"
            }
          ]} title={title}/>
    </>
  )
}

export default UploadFileBody;