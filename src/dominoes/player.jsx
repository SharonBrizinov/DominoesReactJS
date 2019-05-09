import React, { Component } from "react";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnCount: 0,
      game: null,
      tileDeckHand: null,
    };
  }
  render() {
    return (
      <div>
        <p> This is a player! </p>
      </div>
    );
  }
}
export default Player;