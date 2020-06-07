import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from  '../router';
import '../App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <React.Fragment>
            ​{routes}
          </React.Fragment>
          
        </Router>
    );
  }
}

export default App;
