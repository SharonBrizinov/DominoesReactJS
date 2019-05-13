import React, { Component } from 'react';
import Board from '../board/board.jsx';
import Player from '../player/player.jsx';
import { DIRECTIONS, PLAYER_DECK_COUNT, GAME_BANK_DECK_COUNT } from '../consts.js';
import './game.css';

const MAX_TILE_DOT_NUMBER = 6;
const INIT_PLAYER_TILES = 6;

class Game extends Component {
  constructor (props) {
    super(props);
    const emptyBankTiles = this.initTilesBank();
    const initializedPlayers = [{name: 'Player 1', tiles: []}];
    const {bankTiles, players} = this.setPlayerInitTiles(initializedPlayers, emptyBankTiles);

    this.state = {
      turnCount: 0,
      currentPlayer: null,
      cells: Array.from(Array(20 * 10).keys()).map((index) => {
        return {index, tile: null};
      }),
      draggedTile: null,
      bankTiles: bankTiles,
      players: players
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

    cells[droppedCellIndex].tile = {
      rightSideNum,
      leftSideNum,
      direction: DIRECTIONS.vertical,
      draggable: false
    };
    tiles[index].used = true;
    this.setState((prevState) => ({cells, players}));
  }

  getCurrentPlayerIndex () {
    return this.state.turnCount % 1;
  }

  initTilesBank () {
    const bankTiles = [];
    for (let i = 0; i <= MAX_TILE_DOT_NUMBER; i++) {
      for (let j = i; j <= MAX_TILE_DOT_NUMBER; j++) {
        bankTiles.push({rightSideNum: i, leftSideNum: j, used: false},);
      }
    }

    return bankTiles;
  }

  setPlayerInitTiles (players, bankTiles) {
    players.forEach((_, i) => {
      const playerTiles = players[i].tiles;

      for (let i = 0; i < INIT_PLAYER_TILES; i++) {
        const bankTilesSize = bankTiles.length;
        const randomIndex = Math.floor(Math.random() * bankTilesSize);
        playerTiles.push(bankTiles[randomIndex]);
        bankTiles.splice(randomIndex, 1);
      }
    });

    return {players, bankTiles};
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