import React from 'react';
import {render} from 'react-dom';
import VideoFrame from './components/VideoFrame.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello React!</p>;
        <VideoFrame />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
