import React from 'react';
import ReactDOM from 'react-dom';

import Game from './game/game.jsx';

const App = () => (
    <div>
        <Game />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));