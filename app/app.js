import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
          <div>
            <div className="header-arrow"></div>
            <div className="window">
              <h1> hello </h1>
            </div>
          </div>
        );
    }
}

// Render to ID content in the DOM
ReactDOM.render( <App /> ,
  document.getElementById('content')
);
