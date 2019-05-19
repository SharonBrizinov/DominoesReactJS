import React, { Component } from 'react';
import Timer from '../timer/timer.jsx';
import './gameDetails.css';

class GameDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
      }

    render() {
      return (
        <div className='game-details'>
          <div className='mode-status'>
            {this.props.isViewMode ? `View Mode` : `Game Mode`}
          </div>
          <div className='game-moves'>
            {`Moves: ${this.props.gameState.turnCount}/${this.props.totalTurnCount}`}
          </div>
          <div className='tiles-on-board'>
            {`Tiles: ${this.props.usedTiles}/28`}
          </div>
          <button className='history-back' onClick={() => this.props.goBackHistory()}
                  disabled={this.props.shouldDisableBackward}>
            {this.props.isViewMode ? `Previous` : `Undo`}
          </button>
          <button className='history-forward' onClick={() => this.props.goForwardHistory()}
                  disabled={this.props.shouldDisableForward} hidden={!this.props.isViewMode}>
            {`Next`}
          </button>
          <div className='game-reset'>
            <button className='game-reset-btn' onClick={() => this.props.resetGame()}>
              {this.props.isViewMode ? `New Game` : `Reset Game`}
            </button>
          </div>
          <Timer secondsElapsed={this.props.secondsElapsed}/>
        </div>
      );
    }
  }

  export default GameDetails;