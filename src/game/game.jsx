import React, { Component } from 'react';
import Board from '../board/board.jsx';
import Player from '../player/player.jsx';
import { DIRECTIONS, PLAYER_DECK_COUNT, GAME_BANK_DECK_COUNT } from '../consts.js';
import './game.css';

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      turnCount: 0,
      currentPlayer: null,
      cells: Array.from(Array(20 * 10).keys()).map((index) => {
        return {index, tile: null};
      }),
      tileDeckBank: null,
      draggedTile: null,
      players: [{
        name: 'Player 1',
        tiles: [
          {rightSideNum: 0, leftSideNum: 1, used: false},
          {rightSideNum: 2, leftSideNum: 3, used: false},
          {rightSideNum: 4, leftSideNum: 5, used: false},
          {rightSideNum: 5, leftSideNum: 6, used: false}
        ]
      }]
    };

    this.onTileStartDragging = this.onTileStartDragging.bind(this);
    this.onTileDropped = this.onTileDropped.bind(this);
  }

  onTileStartDragging (draggedTile) {
    this.setState((_) => {
      return {draggedTile};
    });
  }

  onTileDropped (droppedCellIndex) {
    const {cells, players} = this.state;
    const {tiles} = players[this.getCurrentPlayerIndex()];
    const {rightSideNum, leftSideNum, index} = this.state.draggedTile;

    cells[droppedCellIndex].tile = {rightSideNum, leftSideNum, direction: DIRECTIONS.horizontal, draggable: false};
    tiles[index].used = true;
    this.setState((prevState) => ({cells, players}));
  }

  getCurrentPlayerIndex () {
    return this.state.turnCount % 1;
  }

  render () {
    return (
      <div className='game'>
        <Board cells={this.state.cells} onTileDropped={this.onTileDropped}/>
        {
          this.state.players.map((player, i) => {
            return <Player key={`player-${i}`}
                           name='Player 1' id={i}
                           tiles={player.tiles}
                           onTileStartDragging={this.onTileStartDragging}/>;
          })
        }
      </div>
    );
  }
}

export default Game;