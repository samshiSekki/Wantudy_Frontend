import React, {useState} from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Mainpage from './pages/MainPage/MainPage';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import MainPageLogged from './pages/MainPage/Main_logged';
import Mypage from './pages/Mypage';
import ModNick from './pages/ModNick';
import RegDefaultApp from './pages/ApplicationManage/RegDefaultApp';
import ModAppLists from './pages/ApplicationManage/ModAppLists';
import ModDefaultApp from './pages/ApplicationManage/ModDefaultApp';
import LikedStudy from './pages/LikedStudy';
import "antd/dist/antd.css";
import PostPage from './pages/PostPage/PostPage'
import './style/PostList.css'
import './style/PostWrite.css'
import RegDefaultApp2 from './pages/ApplicationManage/RegDefaultApp2';
import ModDefaultApp2 from './pages/ApplicationManage/ModDefaultApp2';


function App() {
  const [userInfo, setUserInfo] = useState({
    email:'',
    profileImage:'',
    accessToken:'',
    nickname:'',
    userId:'',
    state: '',
    temperature : ''
  })
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
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

      <Route path='/mypage'>
        <Mypage/>
      </Route>

      <Route path='/mod_nickname'>
        <ModNick/>
      </Route>

      <Route path='/reg_default_app'>
        <RegDefaultApp/>
      </Route>

      <Route path='/reg_default_app2'>
        <RegDefaultApp2/>
      </Route>

      <Route path='/mod_app_lists'>
        <ModAppLists/>
      </Route>

      <Route path='/mod_default_app'>
        <ModDefaultApp/>
      </Route>

      <Route path='/mod_default_app2'>
        <ModDefaultApp2/>
      </Route>

      <Route path='/liked_study'>
        <LikedStudy/>
      </Route>

      <Route path="/post" component={PostPage} />
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
