import React, { Component } from 'react';
import './player.css';
import imgAvatar from '../images/hipster.png';
import Tile from '../tile/tile.jsx';
import { DIRECTIONS, MAX_PLAYER_HAND_TILES } from '../consts';

class Player extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      score: props.score,
    };
  }
  getUnusedTiles () {
    return this.props.tiles.filter((tile) => {return !tile.used});
  }
  isAllowedToGetMoreTiles() {
    return this.getUnusedTiles().length < MAX_PLAYER_HAND_TILES;
  }

  render () {
    let turnTimesSeconds = this.props.turnTimesSeconds;
    let avgTurnTimeSeconds = turnTimesSeconds.length === 0 ? 0 : turnTimesSeconds.reduce((a,b) => a + b, 0) / turnTimesSeconds.length;

    return (
      <div className='player' data-id={this.state.id}>
        <div className='details'>
          <div className='title'>{this.state.name}</div>
          <div className='score'>{`Score: ${this.props.score}`}</div>
          <div className='draws'>{`Draws: ${this.props.drawsCount}`}</div>
          <div className='avg-turn'>{`Time: ${parseInt(avgTurnTimeSeconds)}`}</div>
          <div className='avatar'>
            <img src={imgAvatar} draggable="false"/>
          </div>
          <button className='get-tile' onClick={() => this.props.getTileFromBank()} disabled={!this.isAllowedToGetMoreTiles()}>
            {`Get Tile`}
          </button>
        </div>
        <div className='hand-deck'>
          {
            this.props.tiles.map(
              (tile, index) =>
                tile && !tile.used &&
                <Tile
                  key={index}
                  index={index}
                  draggable
                  onTileStartDragging={this.props.onTileStartDragging}
                  rightSideNum={tile.rightSideNum}
                  leftSideNum={tile.leftSideNum}
                  direction={DIRECTIONS.vertical}
                  isVisible={tile.isVisible}
                />
            )
          }
        </div>
      </div>
    );
  }
}

export default Player;