import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import About from './components/About/About'

import NavBar from './components/NavBar/NavBar'
import Ner from './containers/NerExtractor/Ner'
class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <NavBar></NavBar>
        <div className="container">
          <div className="row">
            
            <div className="col-md-10">
            <Ner></Ner>
            </div>
            
          </div>
        </div>
        

        <Switch>

          <Route path='/about' component={About}></Route>


        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
