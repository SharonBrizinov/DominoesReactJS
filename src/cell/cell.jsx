import React from 'react';

const Cell = ({id, children}) => {
  const extraAttrs = {['data-cell']: id};

  return (
    <div className='cell' {...extraAttrs}
         onDragEnter={(event => onDragEnter(event))}
         onDragLeave={(event => onDragLeave(event))}
    >
      {children}
    </div>
  );
};

function onDragEnter (e) {
  e.preventDefault();
  e.target.setAttribute('style', 'border: 1px solid yellow;');
}

function onDragLeave (e) {
  e.preventDefault();
  e.target.setAttribute('style', 'border: 0');
}

export default Cell;
