import React, { Component } from 'react';
import Board from '../board/board.jsx';
import Player from '../player/player.jsx';
import { DIRECTIONS, PLAYER_DECK_COUNT, GAME_BANK_DECK_COUNT } from '../consts.js';
import './game.css';

class Game extends Component {
  constructor (props) {
    super(props);
    this.boardRef = React.createRef();
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
        <Board ref={this.boardRef}/>
        <Player boardRef={this.boardRef} name='Player 1' id={0}/>
      </div>
    );
  }
}

export default Game;