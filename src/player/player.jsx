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
      name: props.name,
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
                />
            )
          }
        </div>
      </div>
    );
  }
}

export default Player;