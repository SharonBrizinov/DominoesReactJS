import React from 'react';
import ReactDOM from 'react-dom';

import Game from './dominoes/game.jsx';

const App = () => (
    <div>
        <Game />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));