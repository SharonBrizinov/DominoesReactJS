import React, { Component } from "react";

class TileDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTiles: [],
    };
  }
  render() {
    return (
      <div>
        <p> This is a tile deck! </p>
      </div>
    );
  }
}
export default TileDeck;