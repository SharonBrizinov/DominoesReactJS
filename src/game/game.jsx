import React, { Component } from 'react';
import Board from '../board/board.jsx';
import Player from '../player/player.jsx';
import { DIRECTIONS } from '../consts.js';

import './game.css';

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      turnCount: 0,
      currentPlayer: null,
      board: null,
      tileDeckBank: null,
      players: []
    };
  }

  render () {
    return (
      <div className='game'>
        <Board />
        <Player name='Player 1' id={0}/>
      </div>
    );
  }
}

export default Game;