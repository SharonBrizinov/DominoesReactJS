import React, { Component } from 'react';
import Timer from '../timer/timer.jsx';

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
            {` (${this.props.gameState.turnCount}/${this.props.totalTurnCount})`}
          </div>
          <button className='history-back' onClick={() => this.props.goBackHistory()}
                  disabled={this.props.shouldDisableBackward}>
            {this.props.isViewMode ? `Previous` : `Undo`}
          </button>
          <button className='history-forward' onClick={() => this.props.goForwardHistory()}
                  disabled={this.props.shouldDisableForward} hidden={!this.props.isViewMode}>
            {`Next`}
          </button>
          <Timer/>
        </div>
      );
    }
  }

  export default GameDetails;