import React from 'react';
import ReactDOM from 'react-dom';

import Example from './example/example.jsx';

const App = () => (
    <div>
        <Example />       
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
