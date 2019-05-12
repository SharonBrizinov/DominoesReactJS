import React from 'react';
import './emptyCell.css'

const EmptyCell = ({index}) => {
  const extraAttrs = {['data-index']: index};

  return (
    <div className='empty-cell' {...extraAttrs}
         onDragEnter={(event => onDragEnter(event))}
         onDragLeave={(event => onDragLeave(event))}
    />
  );
};

function onDragEnter (e) {
  e.preventDefault();
  e.target.classList.add('drag-enter');
}

function onDragLeave (e) {
  e.preventDefault();
  e.target.classList.remove('drag-enter');
}

export default EmptyCell;
