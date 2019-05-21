import React, { Component } from 'react';

import './popup.css';

const popup = (props) => {
    return (
        <div className="popup-wrapper"
            style={{
                transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            <div className="popup-header">
                <h3>Dominoes Notification</h3>
                <span className="close-popup-btn" onClick={props.close}>x</span>
            </div>
            <div className="popup-body">
                <p> {props.children} </p>
            </div>
        </div>
    )
}

export default popup;
