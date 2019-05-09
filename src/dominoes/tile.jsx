import React, { Component } from 'react';

class Tile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rSideNum: this.props.rSideNum,
      lSideNum: this.props.lSideNum,
      direction: this.props.direction,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler () {
  }

  render () {
    const divStyle = {
      border: '1px solid black',
    };

    return (
      <div style={divStyle} onClick={this.onClickHandler}>
        <p> This is a tile | rSide: {this.state.rSideNum} | lSideNum: {this.state.lSideNum} |
          direction: {this.state.direction}</p>
      </div>
    );
  }
}

export default Tile;