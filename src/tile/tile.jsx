import React from 'react';
import DotContainer from '../dotContainer/dotContainer.jsx';
import './tile.css';

function Tile ({draggable, index, rightSideNum, leftSideNum, direction, onTileStartDragging, shouldGlow}) {
  return (
    <div aba={index} className={'tile'}
         direction={direction}
         glow={(shouldGlow ? "true" : "false")}
         onMouseDown={() => {
           draggable && onTileStartDragging({rightSideNum, leftSideNum, index});
         }}
         draggable={draggable}
    >
      <DotContainer dotsNumber={leftSideNum}/>
      <hr/>
      <DotContainer dotsNumber={rightSideNum}/>
    </div>
  );
}

export default Tile;