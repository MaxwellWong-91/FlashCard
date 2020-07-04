import React, {useState} from "react";
import "../css/components/CreateSetBody.css";


function CreateSetBody() {
  return (
    <>
      <div>
        <h1 className="create-set-heading">Create Your Set</h1>
      </div>
      <div>
        <h4 className="create-set-description">Enter the title of the set</h4>
      </div>

      <div>
        <h4 className="create-set-description">Choose from one of the options to create your flashcards</h4>
      </div>

      <div className="options-container">
        <div>

        </div>
        <div>
          
        </div>
      </div>

      <div>
        <h2 className="create-set-subheading">Do it Yourself</h2>
      </div>
    </>
  )
}

export default CreateSetBody;