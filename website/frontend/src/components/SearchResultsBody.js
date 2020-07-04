import React, {useState} from "react";
import SearchResultsList from "./SearchResultsList";
import "../css/components/SearchResultsBody.css";


function SearchResultsBody() {
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

      <SearchResultsList />
    </>
  )
}

export default SearchResultsBody;