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
      name: props.name
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
          <Tile tileId={0} rightSideNum={1} leftSideNum={2} direction={DIRECTIONS.vertical}/>
          <Tile tileId={1} rightSideNum={3} leftSideNum={4} direction={DIRECTIONS.vertical}/>
          <Tile tileId={2} rightSideNum={5} leftSideNum={6} direction={DIRECTIONS.vertical}/>
        </div>
      </div>
    );
  }
}

export default Player;