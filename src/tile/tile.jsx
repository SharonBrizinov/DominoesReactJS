import React from 'react';
import DotContainer from '../dotContainer/dotContainer.jsx';
import './tile.css';

function Tile ({draggable, index, rightSideNum, leftSideNum, direction, onTileStartDragging, isVisible=false, shouldGlow=false}) {
  return (
    <div aba={index} className={'tile'}
         direction={direction}
         glow={shouldGlow ? "true" : "false"}
         visible={isVisible ? "true" : "false"}
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