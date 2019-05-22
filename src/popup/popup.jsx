import React, { Component } from 'react';

import './popup.css';

const popup = (props) => {
  return (
    <div className='overlay'>
      <div className="popup-wrapper">
        <div className="popup-header">
          <h3>Dominoes Notification</h3>
          <span className="close-popup-btn" onClick={props.close}>x</span>
        </div>
        <div className="popup-body">
          <p> {props.children} </p>
        </div>
      </div>
    </div>
  );
};

export default popup;
