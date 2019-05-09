import React, { Component } from 'react';
import Board from './board.jsx';
import Player from './player.jsx';
import Tile from './tile.jsx';
import TileDeck from './tileDeck.jsx';
import { UP, DOWN, LEFT, RIGHT } from './consts.jsx';

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
        <p> This is a game! </p>
        <Board/>
        <br/>
        <Player/>
        <br/>
        <Tile rSideNum={4} lSideNum={3} direction={UP}/>
        <br/>
        <TileDeck/>
      </div>
    );
  }
}

export default Game;