import React, {Component} from "react";
//import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import FormData from "form-data";
import { Redirect } from "react-router-dom";

const RenderText = (props) => {
  return(
    <div>{props.text}</div>
  )
}

class CreateSet extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      file: null,
      render: false,
      text: ""
    }
  }

  updateName = (event) => {
    this.setState({
      name: event.target.value
    }, () => console.log(this.state.name))
    
  }

  uploadFile = (event) => {
    this.setState({
      file: event.target.files[0]
    })
  }

  handleClick = () => {
    this.setState({
      render: true,
      text: "Processing..."
    })
    //console.log(this.state.file);
    
    var fileReader = new FileReader();

    var name = this.state.name;
    
    fileReader.onload = function(fileLoadedEvent) {
      var file = fileLoadedEvent.target.result;
      // Print data in console

      var data = {
        data: file,
        name: name
      }
      var t0 = performance.now()
      axios.post("/api/process", data)
        .then((res) => {
          axios.post("/api/set/create", data)
            .then((nextRes) => {
              var id = nextRes.data["_id"];
              for (var i = 0; i < res.data.length; i++) {
                console.log(res.data[i][0]);
                var nextData = {
                  word: res.data[i][0],
                  definition: res.data[i][1]
                }
                axios.post("/api/set/" + id + "/card/create", nextData)
              }
              var t1 = performance.now();
              console.log("time taken " + (t1 - t0));
            }) 
            .catch((error) => {
              console.log(error);
            })
          
        })
        .catch((error) => {
          console.log(error);
        })
      
      
    };
    fileReader.readAsDataURL(this.state.file);
  }


  isDisabled = () => {
    return (this.state.name.length === 0 || this.state.file === null)
  }

  render() {
    return (
      <div className = "container" style = {{width: "80%", marginTop: "20px"}}>
        <div className = "md-form" style = {{marginBottom: "15px"}}>
          <input type = "text" 
                 id = "form1" 
                 className = "form-control" 
                 value = {this.state.name} 
                 onChange = {this.updateName}
                 placeholder = "Enter a Name"
          />
        </div>
        
        <div className = "custom-file" style = {{marginBottom: "15px"}}>
          <input type = "file" 
                 className = "custom-file-input" 
                 id = "customFile"
                 onChange = {this.uploadFile}
          />
          <label className = "custom-file-label" for="customFile">Choose file</label>
        </div>
        <button className = "btn btn-primary" onClick = {this.handleClick} disabled = {this.isDisabled()} >Create Set</button>
        {this.render ? <RenderText text = {this.state.text}/>  : null}
      </div> 
    )
  }
}

export default CreateSet;