import React, {useState} from "react";
import ResultsList from "./ResultsList";
import "../css/components/SearchResultsBody.css";


function SearchResultsBody({sets}) {
  return(
    <>
      <div>
        <h1 className="search-results-heading">
          Search Results for "Biology"
        </h1>
      </div>

      <div>
        <p className="search-results-description">
          1-10 results out of 87
        </p>
      </div>

      <ResultsList isSearch={true} sets={sets}/>
    </>
  )
}

export default SearchResultsBody;