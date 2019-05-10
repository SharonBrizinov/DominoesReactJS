import React, { Component } from 'react';
import Tile from '../tile/tile.jsx';
import { DIRECTIONS } from '../consts.jsx';

import './game.css';

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      turnCount: 0,
      currentPlayer: null,
      board: null,
      tileDeckBank: null,
    };
  }

  render () {
    return (
      <div>
        <Tile rightSideNum={1} leftSideNum={2} direction={DIRECTIONS.vertical}/>
        <Tile rightSideNum={3} leftSideNum={4} direction={DIRECTIONS.vertical}/>
        <Tile rightSideNum={5} leftSideNum={6} direction={DIRECTIONS.vertical}/>
      </div>
    );
  }
}

export default Game;