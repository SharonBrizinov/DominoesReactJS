import React, { Component } from 'react';
import DotContainer from '../dotContainer/dotContainer.jsx'
import './tile.css';

class Tile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      rightSideNum: this.props.rightSideNum,
      leftSideNum: this.props.leftSideNum,
      direction: this.props.direction
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler () {
  }

  onDrag (e, tile) {
    this.props.boardRef.current.setDraggedTile(tile);
    e.preventDefault();
    // console.log('onDrag');
    // console.log(e,name)
  }

  render () {
    return (
      <div className={`tile`}
           direction={this.state.direction}
           onClick={this.onClickHandler}
           onDrag={(event) => this.onDrag(event, this)}
           draggable
      >
        <DotContainer dotsNumber={this.state.leftSideNum}/>
        <hr/>
        <DotContainer dotsNumber={this.state.rightSideNum}/>
      </div>
    );
  }
}

export default Tile;