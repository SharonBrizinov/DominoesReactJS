import React, { Component } from 'react';
import './board.css';
import Tile from '../tile/tile.jsx';
import EmptyCell from '../emptyCell/emptyCell.jsx';

class Board extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  onDrop (e) {
    e.preventDefault();
    if (!e.target.classList.contains('dot-container')) {
      e.target.classList.remove('drag-enter');
      this.props.onTileDropped(parseInt(e.target.getAttribute('data-index')));
    }
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
          this.props.cells.map((cell) => {
            return cell.tile ?
              <Tile key={`tile-${cell.index}`} {...cell.tile}/> :
              <EmptyCell key={`cell-${cell.index}`} index={cell.index}/>;
          })
        }
      </div>
    );
  }
}

export default Board;