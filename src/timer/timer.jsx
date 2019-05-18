import React, { Component } from 'react';
import './timer.css';

class Timer extends Component {
    constructor (props) {
        super(props);
      }

    pad (d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    render() {
      const min = this.pad(parseInt(this.props.secondsElapsed / 60));
      const sec = this.pad(parseInt(this.props.secondsElapsed % 60));

      return (
        <div className='timer'>
          <p>{`${min}:${sec}`}</p>
        </div>
      );
    }
  }

  export default Timer;