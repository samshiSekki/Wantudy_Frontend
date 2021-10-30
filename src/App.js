import React, {useState} from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Mainpage from './pages/MainPage/MainPage';
import {Link, Route, Switch} from 'react-router-dom';
import MainPageLogged from './pages/MainPage/Main_logged';

function App() {
  const [userInfo, setUserInfo] = useState({
    email:'',
    profileImage:'',
    accessToken:'',
    nickname:''
  })
  return (
    <div className="App">
      <Route exact path='/'>
        <Mainpage userInfo={userInfo}/>
      </Route>
      
      <Route path='/login'>
        <Login/>
      </Route>

      <Route path='/register'>
        <Register/>
      </Route>

      <Route path='/main'>
        <Mainpage/>
      </Route>

      <Route path='/main_logged'>
        <MainPageLogged/>
      </Route>
    </div>
  );
}

export default App;
