import React, {useState} from "react";
import PublishIcon from '@material-ui/icons/Publish';
import "../css/components/UploadFileBody.css";


function UploadFileBody() {
  return (
    <>
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
                For single-digit numbers, the syntax is "1. word:definition"
                <ul>
                  <li>There must be one space after the period.</li>
                  <li>There must be a colon after the word, followed by a space</li>
                </ul>
              </li>

              <li>
                For double-digit numbers, the syntax is "12.word:definition"
                <ul>
                  <li>There must not be a space after the period</li>
                </ul>
              </li>

              <li>Triple-digit numbers and higher are currently not supported</li>
              <li>Multi-page files are currently not supported</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="file-upload-container bg-white">
        <a>File Upload <PublishIcon /></a>
      </div>

      <a className="pill-primary generate-flashcards-button">Generate Flashcards</a>
      
    </>
  )
}

export default UploadFileBody;