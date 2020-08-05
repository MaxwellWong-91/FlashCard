import React, {useState} from "react";
import ResultsList from "./ResultsList";
import "../css/components/ViewSetsBody.css";

function ViewSetsBody() {
  return (
    <>
      <div>
        <h1 className="view-sets-heading">
          Your Sets
        </h1>
      </div>

      <ResultsList isSearch={false}/>
    </>
  )
}

export default ViewSetsBody;