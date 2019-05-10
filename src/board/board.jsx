import React, { Component } from 'react';
import Tile from '../tile/tile.jsx';
import { DIRECTIONS } from '../consts';

class Board extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <Tile rightSideNum={1} leftSideNum={2} direction={DIRECTIONS.vertical}/>
        <Tile rightSideNum={3} leftSideNum={4} direction={DIRECTIONS.horizontal}/>
        <Tile rightSideNum={5} leftSideNum={6} direction={DIRECTIONS.vertical}/>
      </div>
    );
  }
}

export default Board;