import React, {Component} from "react";


class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style = {this.props.style}>
        {this.props.text}
      </div>
    )
  }
}

export default Card;