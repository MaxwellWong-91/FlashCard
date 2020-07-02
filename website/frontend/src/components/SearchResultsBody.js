import React, {useState} from "react";
import "../css/components/SearchResultsBody.css";


function SearchResultsBody() {
  return(
    <>
      <div>
        <h1>
          Search Results for "Biology"
        </h1>
      </div>

      <div>
        <p>
          1-10 results out of 87
        </p>
      </div>

      <ul className="result-list">
        <li className="result-list-item">
          <div className="result-list-heading">
            <p>Set Name</p>
            <p>By KiruKirai</p>
          </div>
          <div className="result-list-num-terms">
            <p>
              3 terms
            </p>
          </div>
          <ul className="result-list-word-container">
            <li className="result-list-word-container-item">
              <p>Word</p>
              <p>Definition Definition Definition Definition Definition Definition Definition Definition Definition DefinitionDefinition</p>
            </li>
          </ul>
        </li>
      </ul>
    </>
  )
}

export default SearchResultsBody;