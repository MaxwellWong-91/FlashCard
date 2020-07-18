import React, {useState} from "react";
import SearchResultsList from "./SearchResultsList";
import "../css/components/ViewSetsBody.css";

function ViewSetsBody() {
  return (
    <>
      <div>
        <h1 className="view-sets-heading">
          Your Sets
        </h1>
      </div>

      <SearchResultsList />
    </>
  )
}

export default ViewSetsBody;