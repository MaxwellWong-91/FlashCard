import React, {useState} from "react";
import ResultsList from "./ResultsList";
import "../css/components/SearchResultsBody.css";


function SearchResultsBody({initialSets, searchParam}) {
  return(
    <>
      <div>
        <h1 className="search-results-heading">
          Search Results for "{searchParam}"
        </h1>
      </div>

      <div>
        <p className="search-results-description">
          1-10 results out of {initialSets.length}
        </p>
      </div>

      <ResultsList isSearch={true} initialSets={initialSets}/>
    </>
  )
}

export default SearchResultsBody;