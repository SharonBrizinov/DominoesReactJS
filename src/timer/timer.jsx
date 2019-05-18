import React, { Component } from 'react';

const TICK_TIME_MILISECONDS = 1000;

class Timer extends Component {
    constructor (props) {
        super(props);
        this.state = {
          isRunning: false,
          accTime: 0,
        };
        this.interval = setInterval(this.tick.bind(this), TICK_TIME_MILISECONDS);
      }

    tick() {
        this.setState({accTime: this.state.accTime+1});
    }

    reset () {
        this.setState({isRunning: true, accTime: 0});
        this.interval = setInterval(this.tick.bind(this), TICK_TIME_MILISECONDS);
    }

    stop () {
        this.setState({isRunning: false});
        clearInterval(this.interval)
    }

    pad (d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    render() {
      const min = this.pad(parseInt(this.state.accTime / 60));
      const sec = this.pad(parseInt(this.state.accTime % 60));

      return (
        <div className='timer'>
          <p>{`${min}:${sec}`}</p>
        </div>
      );
    }
  }

  export default Timer;