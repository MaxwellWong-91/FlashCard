import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Set = props => (
  <tr>
    <td><Link to = {"/set/study/"+props.set._id}>{props.set.name}</Link></td>
    <td>{props.set.flashcards.length + " cards"}</td>
  </tr>
)

class ViewSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sets: []
    }
  }

  componentDidMount() {
    axios.get("/api/set")
      .then(response => {
        this.setState({
          sets: response.data
        }, () => {
          console.log(this.state.sets);
        })
      })
      .catch((error) => {
        console.log(error);
      })

    
  }

  makeSetTable() {
    return this.state.sets.map(set => {
      return <Set set = {set} key = {set._id}/>
    })
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Cards in Set</th>
            </tr>
          </thead>
          <tbody>
            { this.makeSetTable() }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ViewSet;