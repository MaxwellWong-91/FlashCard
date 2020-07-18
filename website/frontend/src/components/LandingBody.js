import React, {useState} from "react";
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import "../css/components/LandingBody.css";

const useStyles = makeStyles({
  root: {
    fontSize: "3rem",
    color: "#fff",
    backgroundColor: "#8738B6",
    borderRadius: "35px",
    padding: "0.2em",
    marginBottom: "0.4em"
  },
});

function LandingBody() {
  const classes = useStyles();
  return(
    <>
      <div className="outer-showcase bg-white">
        <section id="showcase">
          <div className="container">
            <h1>Learn. Study. Repeat.</h1>
            <p>Flashcard Manager is the best way to organize and study your flashcards. Study at your convienience whether from home, school, or at the office.</p>
          </div>
        </section>
        <div className="inner-showcase black-bg"></div>
      </div>

      <section id="features" className="bg-white">
        <h2>
          What We Offer
        </h2>
        <div className="container">

          <div className="feature-item">
            <DescriptionIcon 
            classes={{
              root: classes.root
            }}/>
            <div className="feature-title">Create Flashcard Sets</div>
            <p className="feature-text">Our software leverages Tesseract.js powerful image recognition technology to read text data from any image or pdf. Upload a file and our software will handle the rest.</p>
          </div>

          <div className="feature-item">
            <SearchIcon
            classes={{
              root: classes.root
            }}/>
            <div className="feature-title">Find Existing Set</div>
            <p className="feature-text">Don’t know where to start? We embedded a seamless search bar with autocomplete to let you find sets matching topics that you are interested in.</p>
          </div>

          <div className="feature-item">
            <EditIcon 
            classes={{
              root: classes.root
            }}/>
            <div className="feature-title">Manage Set</div>
            <p className="feature-text">Customize your sets with our simple editing system that lets you make changes as you study.</p>
          </div>

        </div>
      </section>
    </>
  )
}

export default LandingBody;