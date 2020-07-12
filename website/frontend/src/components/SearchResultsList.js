import React, {useState} from "react";
import "../css/components/SearchResultsList.css";


function SearchResultsList() {
  return (
    <ul className="result-list bg-white">
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

export default SearchResultsList;