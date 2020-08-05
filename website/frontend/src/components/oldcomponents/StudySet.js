import React, {Component} from "react";
import axios from "axios";
import Card from "./Card";

class StudySet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashcards: [],
      stringCards: [],
      currIndex: 0,
      onWord: true,
      finishUpdate: false
    }
  }

  componentDidMount() {
    axios.get("/api/set/" + this.props.match.params.id)
      .then(response => {
        for (var i = 0; i < response.data.flashcards.length; i++) {
          console.log("/api/set/"+ this.props.match.params.id + "/card/" + response.data.flashcards[i])
          axios.get("/api/set/"+ this.props.match.params.id + "/card/" + response.data.flashcards[i])
            .then( card => {
              this.setState((prevState) => ({
                flashcards: [...prevState.flashcards, card.data]
              }), () => {
                console.log(this.state.flashcards[0]);
                console.log(this.state.flashcards[0]["word"]);
              })
            })
            .catch((error) => {
              console.log(error);
            })
        }
        this.setState({
          finishUpdate: true
        })
      })
      .catch((error) => {
        console.log(error);
      })
    }

  renderWord() {
    return (
      <div style = {{fontSize: "48px", margin: "auto"}}>
        {(JSON.stringify(this.state.flashcards[0]["word"]).slice(1, -1))}
      </div>
    )
  }

  renderDefinition() {
    return (
      <div style = {{fontSize: "24px", margin: "auto"}}>
        {(JSON.stringify(this.state.flashcards[0]["definition"]).slice(1, -1))}
      </div>
    )
  }

  handleClick = () => {
    this.setState((prevState) => ({
      onWord: !prevState.onWord
    }))
  }

  goLeft = () => {
    this.setState((prevState) => ({
      currIndex: (prevState.currIndex - 1 + prevState.flashcards.length) % prevState.flashcards.length
    }))
  }

  goRight = () => {
    this.setState((prevState) => ({
      currIndex: (prevState.currIndex + 1) % prevState.flashcards.length
    }))
  }

  render() {
    // prevent page from laoding before everything updated
    if (this.state.flashcards.length === 0) {
      return <div />
    }
    return (
      <div className = "container" style = {{height: "500px", marginTop: "20px"}}>
        <div className = "row" style = {{margin: "auto", marginBottom: "5px", height: "200px", width: "800px", border: "3px lightgrey solid"}} >
          {this.state.onWord ? <Card text = {(JSON.stringify(this.state.flashcards[this.state.currIndex]["word"]).slice(1, -1))} style = {{fontSize: "48px", margin: "auto"}}/> 
                             : <Card text = {(JSON.stringify(this.state.flashcards[this.state.currIndex]["definition"]).slice(1, -1))} style = {{fontSize: "24px", margin: "auto"}}/>}
        </div>
        
        <div className = "row" style = {{margin: "auto", textAlign: "center", display: "table"}}>
          <div style = {{marginLeft: "auto", display: "table-cell"}}><button onClick = {this.goLeft}><i className="fa fa-chevron-left"></i></button></div>
          <div style = {{display: "inline-block", display: "table-cell"}}><button onClick = {this.handleClick}>Flip</button></div>
          <div style = {{marginRight: "auto", display: "table-cell"}}><button onClick = {this.goRight}><i className="fa fa-chevron-right"></i></button></div>
        </div>
      </div>
    )
  }
}

export default StudySet;