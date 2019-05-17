import React, { Component } from 'react';
import Board from '../board/board.jsx';
import Player from '../player/player.jsx';
import { DIRECTIONS, MAX_TILE_DOT_NUMBER, INIT_PLAYER_TILES, BOARD_COLUMN_SIZE } from '../consts.js';
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
        return {index, tile: null, legal: true};
      }),
      draggedTile: null,
      tilesOnBoard: [],
      bankTiles: bankTiles,
      players: players,
      stateHistory: [],
      stateHistoryIndex: -1,
      isGameEnded: false,
      isViewMode: false,
      isGameMode: true,
    };

    this.getTileFromBank = this.getTileFromBank.bind(this);
    this.onTileStartDragging = this.onTileStartDragging.bind(this);
    this.onTileDropped = this.onTileDropped.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown (event) {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === 'z') {
      this.goBackHistory();
    }
  }

  isHistoryEmpty () {
    return this.state.stateHistory.length === 0;
  }

  goForwardHistory () {
    // We must be in View mode to go forward in history
    if (this.state.isViewMode) {
      // Make sure we have future history
      if (this.state.stateHistoryIndex < this.state.stateHistory.length - 1) {
        let newStateHistoryIndex = this.state.stateHistoryIndex + 1;
        this.setState({stateHistoryIndex: newStateHistoryIndex});
      }
    }
  }

  goBackHistory () {
    // Make sure we have some history to work with
    if (this.isHistoryEmpty()) {
      return;
    }
    // If we are in game mode, go back means Undo
    if (this.state.isGameMode) {
      // Get previous saved state
      let lastState = this.state.stateHistory.pop();
      // removing history from new state
      delete lastState.stateHistory;
      // Set as new state (while keeping our history safe)
      this.setState({...lastState});
    } else if (this.state.isViewMode) {
      // Otherwise, we are in View mode
      if (this.state.stateHistoryIndex > 0) {
        let newStateHistoryIndex = this.state.stateHistoryIndex - 1;
        this.setState({stateHistoryIndex: newStateHistoryIndex});
      } else {
        console.log(`Error: Ambigious mode! Check game state: ${this.state}`);
      }
    }
  }

  // Will update history with current state
  updateHistory () {
    // Create deepcopy of current state (TODO: find a better way to deepcopy)
    let newState = JSON.parse(JSON.stringify(this.state));
    // Get a copy of state history
    let clonedHistory = this.state.stateHistory.slice();
    // removing history from new state and add new state to history
    delete newState.stateHistory;
    clonedHistory.push(newState);
    // Update index to last state
    let newStateHistoryIndex = this.state.stateHistoryIndex + 1;

    // Update the new state history array
    this.setState({stateHistory: clonedHistory, stateHistoryIndex: newStateHistoryIndex});
  }

  turnEnded () {
    // Update turn count
    let currentTrunCount = this.state.turnCount + 1;
    this.setState({turnCount: currentTrunCount}, () => {
      // Then check if game has ended
      this.checkGameEnded();
    });

  }

  onTileStartDragging (draggedTile) {
    this.setState((_) => {
      return {draggedTile};
    });
  }

  checkGameEnded () {
    let allTilesInGame = [];

    // Collect tiles from all players in game, and filter for unused tiles
    this.state.players.forEach((_, i) => { allTilesInGame.push(...this.state.players[i].tiles); });
    let unusedPlayersTiles = allTilesInGame.filter((tile) => {return !tile.used;});

    // No tiles left in bank and all players used their tiles
    if (this.state.bankTiles.length === 0 && unusedPlayersTiles.length === 0) {
      // Game ended, save current state and update flag
      let isGameEnded = true;
      let isViewMode = true;
      let isGameMode = false;
      this.setState({isGameEnded: isGameEnded, isViewMode: isViewMode, isGameMode: isGameMode}, () => {
        // last move in the game must be kept
        this.updateHistory();
      });
      alert('Game is over !');
      return true;
    }
    return false;
  }

  onTileDropped (droppedCellIndex) {
    if (this.state.isGameEnded) {
      alert('Game has ended, you can\'t play!');
      return;
    }

    // Save current state, before any modifications
    this.updateHistory();

    const indexCurrentPlayer = this.getCurrentPlayerIndex();

    const {cells, players, tilesOnBoard} = this.state;
    const {tiles} = players[indexCurrentPlayer];
    const {rightSideNum, leftSideNum, index} = this.state.draggedTile;
    const isFirstDropped = tilesOnBoard.length === 0;
    const newTile = {
      rightSideNum,
      leftSideNum,
      direction: cells[droppedCellIndex].direction || DIRECTIONS.vertical,
      draggable: false,
      cellIndex: droppedCellIndex
    };

    if (isFirstDropped || this.isLegalDrop(cells, droppedCellIndex, newTile)) {
      // Update score
      players[indexCurrentPlayer].score += 1;

      tilesOnBoard.push(newTile);
      cells[droppedCellIndex].tile = newTile;
      tiles[index].used = true;

      if (isFirstDropped) // all places are illegal
        this.initIllegalCells(cells);

      this.setLegalCells(cells, tilesOnBoard);

      this.setState((prevState) => ({cells, players, tilesOnBoard}), () => {
        // End turn
        this.turnEnded();
      });
    }
  }

  isLegalDrop (cells, droppedCellIndex, newTile) {

    const {rightSideNum, leftSideNum} = this.state.draggedTile;

    let legal = this.checkAlDroppedSides(cells, droppedCellIndex, rightSideNum, leftSideNum);
    if (legal)
      return legal;
    legal = this.checkAlDroppedSides(cells, droppedCellIndex, leftSideNum, rightSideNum);

    if (legal) { // rotate tile
      newTile.rightSideNum = leftSideNum;
      newTile.leftSideNum = rightSideNum;
      return legal;
    }

    return false;

  }

  checkAlDroppedSides (cells, droppedCellIndex, rightSideNum, leftSideNum) {
    const upCell = cells[droppedCellIndex - BOARD_COLUMN_SIZE];
    const downCell = cells[droppedCellIndex + BOARD_COLUMN_SIZE];
    const leftCell = cells[droppedCellIndex - 1];
    const rightCell = cells[droppedCellIndex + 1];
    const upLegalDrop = !upCell.tile || upCell.tile && leftSideNum === upCell.tile.rightSideNum;
    const downLegalDrop = !downCell.tile || downCell.tile && rightSideNum === downCell.tile.leftSideNum;
    const leftLegalDrop = !leftCell.tile || leftCell.tile && leftSideNum === leftCell.tile.rightSideNum;
    const rightLegalDrop = !rightCell.tile || rightCell.tile && rightSideNum === rightCell.tile.leftSideNum;

    return upLegalDrop && downLegalDrop && leftLegalDrop && rightLegalDrop;
  }

  initIllegalCells (cells) {
    cells.forEach((cell) => {
      cell.legal = false;
    });
  }

  setLegalCells (cells, tilesOnBoard) {
    tilesOnBoard.forEach((tile) => {
      const {rightSideNum, leftSideNum, cellIndex} = tile;
      const verticalCellJump = tile.direction === DIRECTIONS.vertical ? BOARD_COLUMN_SIZE : 1;
      const horizontalCellJump = tile.direction === DIRECTIONS.vertical ? 1 : BOARD_COLUMN_SIZE;
      const upCellIndex = cellIndex - verticalCellJump;
      const downCellIndex = cellIndex + verticalCellJump;
      const leftCellIndex = cellIndex - horizontalCellJump;
      const rightCellIndex = cellIndex + horizontalCellJump;
      const horizontalIndices = [
        {
          index: leftCellIndex,
          direction: DIRECTIONS.horizontal
        }, {
          index: rightCellIndex,
          direction: DIRECTIONS.horizontal
        }
      ];

      let legalIndices = [
        {
          index: upCellIndex,
          direction: DIRECTIONS.vertical
        }, {
          index: downCellIndex,
          direction: DIRECTIONS.vertical
        }
      ];

      legalIndices = [...(rightSideNum === leftSideNum ? horizontalIndices : []), ...legalIndices];

      legalIndices.forEach((legal) => {
        if (!cells[legal.index].tile) {
          cells[legal.index].legal = true;
          cells[legal.index].direction = legal.direction;
        }
      });
    });
  }

  getCurrentPlayerIndex () {
    return this.state.turnCount % this.state.players.length;
  }

  popRandomTile (tilesArr) {
    if (tilesArr.length > 0) {
      const randomIndex = Math.floor(Math.random() * tilesArr.length);
      let tile = tilesArr.splice(randomIndex, 1)[0];
      return tile;
    } else {
      alert('No more tiles in bank!');
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
    if (this.state.isGameEnded) {
      alert('Game has ended, you can\'t request more tiles!');
      return;
    }

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
      this.setState((prevState) => ({bankTiles, players}), () => {
        // End turn
        this.turnEnded();
      });
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
    // Actual game state
    let isActualViewMode = this.state.isViewMode;
    let actualTurnCount = this.state.turnCount;
    let isHistoryEmpty = this.isHistoryEmpty();
    let shouldDisableBackward = isHistoryEmpty || (isActualViewMode && this.state.stateHistoryIndex == 0);
    let shouldDisableForward = !isActualViewMode || (isActualViewMode && this.state.stateHistoryIndex === this.state.stateHistory.length - 1);

    // Current state that we want to present to the user (to support the View Mode feature)
    let currentStateToShow = isActualViewMode ? this.state.stateHistory[this.state.stateHistoryIndex] : this.state;

    return (
      <div className='game' onKeyDown={this.handleKeyDown}>
        <div className='game-details'>
          <div className='mode-status'>
            {isActualViewMode ? `View Mode` : `Game Mode`}
            {` (${currentStateToShow.turnCount}/${actualTurnCount})`}
          </div>
          <button className='history-back' onClick={() => this.goBackHistory()}
                  disabled={shouldDisableBackward}>
            {isActualViewMode ? `Previous` : `Undo`}
          </button>
          <button className='history-forward' onClick={() => this.goForwardHistory()}
                  disabled={shouldDisableForward} hidden={!isActualViewMode}>
            {`Next`}
          </button>
        </div>
        <Board cells={currentStateToShow.cells} onTileDropped={this.onTileDropped}/>
        {
          currentStateToShow.players.map((player, i) => {
            return <Player key={`player-${i}`}
                           name={player.name} id={i}
                           tiles={player.tiles}
                           onTileStartDragging={this.onTileStartDragging}
                           score={player.score}
                           getTileFromBank={this.getTileFromBank}/>;
          })
        }
      </div>
    );
  }
}

export default Game;