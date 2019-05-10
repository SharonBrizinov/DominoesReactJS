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
        <div className='cards'>
          <Tile rightSideNum={1} leftSideNum={2} direction={DIRECTIONS.vertical}/>
          <Tile rightSideNum={3} leftSideNum={4} direction={DIRECTIONS.vertical}/>
          <Tile rightSideNum={5} leftSideNum={6} direction={DIRECTIONS.vertical}/>
        </div>
      </div>
    );
  }
}

export default Player;