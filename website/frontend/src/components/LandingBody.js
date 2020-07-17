import React, {useState} from "react";
import DescriptionIcon from '@material-ui/icons/Description';
import "../css/components/LandingBody.css";

function LandingBody() {
  return(
    <>
      <div className="black-bg">
        <section id="showcase">
          <div className="container">
            <h1>Learn. Study. Repeat.</h1>
            <p>Flashcard Manager is the best way to organize and study your flashcards. Study at your convience whether from home, school, or at the office.</p>
          </div>
        </section>
      </div>

      <section id="features">
        <div className="container">
          <h2>
            What We Offer
          </h2>

          <div className="feature-item">
            <DescriptionIcon />
            <div className="feature-title">Create a Set</div>
            <p className="feature-text">Upload a file and our software will create the cards for you.</p>
          </div>

          <div className="feature-item">
            <img></img>
            <div className="feature-title">Create a Set</div>
            <p className="feature-text">Upload a file and our software will create the cards for you.</p>
          </div>

          <div className="feature-item">
            <img></img>
            <div className="feature-title">Create a Set</div>
            <p className="feature-text">Upload a file and our software will create the cards for you.</p>
          </div>

        </div>
      </section>
    </>
  )
}

export default LandingBody;