import React, { Component } from 'react';
import './board.css';
import Tile from '../tile/tile.jsx';
import EmptyCell from '../emptyCell/emptyCell.jsx';
import UsedCell from '../usedCell/usedCell.jsx';

class Board extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  onDrop (e) {
    e.preventDefault();
    if (e.target.classList.contains('empty-cell') ) {
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
              this.getEmptyCell(cell);
          })
        }
      </div>
    );
  }

  getEmptyCell (cell) {
    const cellKey = `cell-${cell.index}`;
    return cell.used ? <UsedCell key={cellKey} /> : <EmptyCell key={cellKey} index={cell.index}/>;
  }
}

export default Board;