import React from 'react';
import ReactDOM from 'react-dom';

import Game from './game/game.jsx';

const App = () => (
  <Game/>
);

ReactDOM.render(<App/>, document.getElementById('root'));