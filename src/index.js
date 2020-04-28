import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import Home from './home';
import List from './list';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/list" component={List} />
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
