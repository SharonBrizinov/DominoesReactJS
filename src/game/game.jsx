import React, { Component } from 'react';
import Board from '../board/board.jsx';
import Player from '../player/player.jsx';
import { DIRECTIONS, MAX_TILE_DOT_NUMBER, INIT_PLAYER_TILES } from '../consts.js';
import './game.css';

class Game extends Component {
  constructor (props) {
    super(props);
    const emptyBankTiles = this.initTilesBank();
    const initializedPlayers = [{name: 'Player 1', tiles: [], score: 0}];
    const {bankTiles, players} = this.setPlayerInitTiles(initializedPlayers, emptyBankTiles);

    this.state = {
      turnCount: 0,
      currentPlayer: null,
      cells: Array.from(Array(20 * 10).keys()).map((index) => {
        return {index, tile: null};
      }),
      draggedTile: null,
      bankTiles: bankTiles,
      players: players,
      stateHistory: [],
      isGameEnded: false
    };

    this.getTileFromBank = this.getTileFromBank.bind(this)
    this.onTileStartDragging = this.onTileStartDragging.bind(this);
    this.onTileDropped = this.onTileDropped.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if((event.ctrlKey || event.metaKey) && charCode === 'z') {
      this.goBackHistory();
    }
  }

  goBackHistory() {
    if (this.state.stateHistory.length === 0){
      return;
    }
    // Get previous saved state
    let lastState = this.state.stateHistory.pop();
    this.setState({...lastState});
  }

  // Will update history with current state
  updateHistory() {
    let newState = JSON.parse(JSON.stringify(this.state)); // TODO: find a better way to deepcopy
    let clonedHistory = this.state.stateHistory.splice();
    clonedHistory.push(newState);
    this.setState({stateHistory : clonedHistory})
  }

  onTileStartDragging (draggedTile) {
    this.setState((_) => {
      return {draggedTile};
    });
  }

  checkGameEnded() {
    let allTilesInGame = [];
    let isGameEnded = false;

    // Collect tiles from all players in game, and filter for unused tiles
    this.state.players.forEach((_, i) => { allTilesInGame.push(...this.state.players[i].tiles); });
    let unusedPlayersTiles = allTilesInGame.filter((tile)=>{return !tile.used});

    // No tiles left in bank and all players used their tiles
    if (this.state.bankTiles.length === 0 && unusedPlayersTiles.length === 0) {
      // Game ended, save current state and update flag
      this.updateHistory(); // last move in the game must be kept
      isGameEnded = true;
      alert('Game is over !');
    }

    this.setState({isGameEnded:isGameEnded});
  }

  onTileDropped (droppedCellIndex) {
    // Save current state, before any modifications
    this.updateHistory();

    const indexCurrentPlayer = this.getCurrentPlayerIndex();
    const {cells, players} = this.state;
    const {tiles} = players[indexCurrentPlayer];
    const {rightSideNum, leftSideNum, index} = this.state.draggedTile;

    // Update score
    players[indexCurrentPlayer].score += 1;

    cells[droppedCellIndex].tile = {
      rightSideNum,
      leftSideNum,
      direction: DIRECTIONS.vertical,
      draggable: false
    };
    tiles[index].used = true;
    this.setState((prevState) => ({cells, players}));

    // Check if game is over
    this.checkGameEnded();
  }

  getCurrentPlayerIndex () {
    return this.state.turnCount % 1;
  }

  popRandomTile(tilesArr) {
    if (tilesArr.length > 0) {
      const randomIndex = Math.floor(Math.random() * tilesArr.length);
      let tile = tilesArr.splice(randomIndex, 1)[0];
      return tile;
    } else {
      alert('No more tiles !');
      return null;
    }
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

  getTileFromBank () {
    // Save current state, before any modifications
    this.updateHistory();

    const indexCurrentPlayer = this.getCurrentPlayerIndex();
    const {bankTiles, players} = this.state;
    const {tiles} = players[indexCurrentPlayer];
  
    // Push tile from bank to player's hand
    let newTile = this.popRandomTile(bankTiles);
    // Check first that we have a new tile
    if (newTile) {
      tiles.push(newTile);
      this.setState((prevState) => ({bankTiles, players}));
  }
  }

  setPlayerInitTiles (players, bankTiles) {
    players.forEach((_, i) => {
      const playerTiles = players[i].tiles;

      for (let i = 0; i < INIT_PLAYER_TILES; i++) {
        // Push tile from bank to player's hand
        playerTiles.push(this.popRandomTile(bankTiles));
      }
    });

    return {players, bankTiles};
  }

  render () {
    return (
      <div className='game' onKeyDown={this.handleKeyDown}>
        <Board cells={this.state.cells} onTileDropped={this.onTileDropped}/>
        {
          this.state.players.map((player, i) => {
            return <Player key={`player-${i}`}
                           name={player.name} id={i}
                           tiles={player.tiles}
                           onTileStartDragging={this.onTileStartDragging}
                           score={player.score}
                           getTileFromBank={this.getTileFromBank}/>;
          })
        }
        <button className='history-back' onClick={() => this.goBackHistory()} disabled={this.state.stateHistory.length===0}>
          {`Undo`}
        </button>
      </div>
    );
  }
}

export default Game;