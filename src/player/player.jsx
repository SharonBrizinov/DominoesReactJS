import React, { Component } from 'react';
import './player.css';
import img from '../images/hipster.png';

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
      </div>
    );
  }
}

export default Player;