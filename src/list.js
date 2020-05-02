import React, { Component } from 'react';
import ReactDom from 'react-dom';
class App extends Component {
  render() {
    return (
      <div>
        <div>This is listpage</div>
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('root'))