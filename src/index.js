import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game/game.jsx';
import './index.css'

const App = () => (
  <Game/>
);

ReactDOM.render(<App/>, document.getElementById('root'));