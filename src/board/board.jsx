import React, { Component } from 'react';
import './board.css';
import Tile from '../tile/tile.jsx';
import Cell from '../cell/cell.jsx';
import { DIRECTIONS } from '../consts';

class Board extends Component {
  constructor (props) {
    super(props);
    this.state = {
      draggedTile: null,
      cells: Array.from(Array(20 * 10).keys()).map((num, i) => {
        return {i, tile: false};
      })
    };
  }

  setDraggedTile (draggedTile) {
    // this.setState((prevState)=>({draggedTile: draggedTile}))
  }

  onDrop (e) {
    e.preventDefault();
    console.log('onDrop');
    console.log(parseInt(e.target.getAttribute('data-cell')));
    console.log(this.state.draggedTile);
    const cells = this.state.cells;
    const index = parseInt(e.target.getAttribute('data-cell'));
    console.log(cells);
    cells[index].tile = true;
    this.setState((prevState) => ({cells}));
    e.target.setAttribute('style', 'border: 0');
  }

  onDragOver (e) {
    e.preventDefault();
  }

  render () {
    return (
      <div className='board'
           onDrop={(e) => this.onDrop(e)}
           onDragOver={(event => this.onDragOver(event))}
      >
        {
          this.state.cells.map((cell) => {
            return cell.tile ?
              <div style='background-color:yellow; width: 10px; height: 10px'></div> :
              <Cell key={cell.i} id={cell.i}>{this.state.draggedTile}</Cell>;
          })
        }
      </div>
    );
  }
}

export default Board;