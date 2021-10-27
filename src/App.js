import React from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import {Link, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Login/>
      </Route>
      
      <Route path='/register'>
        <Register/>
      </Route>

      <Route path='/main'>
        <LandingPage/>
      </Route>
    </div>
  );
}

export default App;
