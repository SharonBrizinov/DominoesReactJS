import React, { Component } from 'react';
import DotContainer from '../dotContainer/dotContainer.jsx'
import './tile.css';

class Tile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      rightSideNum: this.props.rightSideNum,
      leftSideNum: this.props.leftSideNum,
      direction: this.props.direction,
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler () {
  }

  render () {
    return (
      <div className={`tile ${this.state.direction}-tile`} onClick={this.onClickHandler}>
        <DotContainer dotsNumber={this.state.leftSideNum}/>
        <hr/>
        <DotContainer dotsNumber={this.state.rightSideNum}/>
      </div>
    );
  }
}

export default Tile;