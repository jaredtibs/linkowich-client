import React  from 'react';
import '../renderer/styles/Main.scss';

class Main extends React.Component {

  render() {
         return (<div className="container">
            <p>We are using node {process.versions.node}</p>
            <p>Chrome {process.versions.chrome}</p>
            <p>Electron {process.versions.electron}</p>
            <p>and <Headline />.</p>
        </div>
        );
  }
}

export default Main
