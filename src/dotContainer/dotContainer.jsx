import React from 'react';
import './dotContainer.css'

const MAX_DOTS = 9;

/*
Number: 3
Indices: 0, 4, 8
-------------
| X |   |   |
-------------
|   | X |   |
-------------
|   |   | X |
-------------
*/

const DotContainer = ({dotsNumber}) => {
  const extraAttrs = {['dots-number']: dotsNumber};

  return (
    <div className='dot-container' {...extraAttrs}>
      {
        Array.from(Array(MAX_DOTS).keys()).map((num,i) => {
          const dotExtraAttr = {['dot-index']: i};
          return <div key={i} {...dotExtraAttr} className={'dot'}/>;
        })
      }
    </div>
  );
};

export default DotContainer;
