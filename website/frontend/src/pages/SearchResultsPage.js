import React, {useState} from "react";
import Navbar from "../components/Navbar";
import SearchResultsBody from "../components/SearchResultsBody";


function SearchResultsPage() {
  return(
    <>
      <Navbar />
      <SearchResultsBody />
    </>
  )

}

export default SearchResultsPage;