import React, { Component } from 'react';
import './player.css';
import img from '../images/hipster.png';
import Tile from '../tile/tile.jsx';
import { DIRECTIONS } from '../consts';

class Player extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.id,
      game: props.game,
      name: props.name,
      tiles: [
        {rightSideNum: 1, leftSideNum: 2},
        {rightSideNum: 4, leftSideNum: 6},
        {rightSideNum: 4, leftSideNum: 6}
      ]
    };
  }

  render () {
    return (
      <div className='player' data-id={this.state.id}>
        <div className='details'>
          <div className='title'>{this.state.name}</div>
          <div className='avatar'>
            <img src={img}/>
          </div>
        </div>
        <div className='cards'>
          {
            this.state.tiles.map(
              (tile, i) =>
                <Tile
                  key={i}
                  boardRef={this.props.boardRef}
                  rightSideNum={tile.rightSideNum}
                  leftSideNum={tile.leftSideNum}
                  direction={DIRECTIONS.vertical}
                />
            )
          }
        </div>
      </div>
    );
  }
}

export default Player;