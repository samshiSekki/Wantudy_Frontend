import React from 'react';
import '../../css/navbar.css';
import { useLocation } from 'react-router';
import { withRouter, useHistory } from 'react-router-dom';

const {Kakao} = window;

function Navbar(props) {
    return (
        <div>
            {props.userInfo.nickname === ''
            ? <LoggedOut userInfo={props.userInfo}/>
            : <LoggedIn userInfo={props.userInfo}/>
            }
        </div>
    )
}

function LoggedOut(props){
    let history = useHistory();

    function logoClickHandler(){
        history.push('/main');
    }

    return(
    <div>
        <div className="navbar">
        <img src="img/LOGO 1.png" className="navbarLogoImg"/>
        <div className="logo" onClick={logoClickHandler}>wantudy</div>
        <div className="join" onClick={()=>{history.push("/login")}}>스터디 참여</div>
        <div className="make" onClick={()=>{history.push("/login")}}>스터디 개설</div>
        <div className="apply" onClick={()=>{history.push("/login")}}>스터디 신청서 등록</div>
        <div className="login" onClick={()=>{history.push("/login")}}>로그인</div>
        <div className="register" onClick={()=>{history.push("/login")}}>회원가입</div>
        </div>
    </div>
    );
}

function LoggedIn(props){
    let history = useHistory();

    function LogoutClickHandler(){
        if (Kakao.Auth.getAccessToken()) {
           
            Kakao.Auth.logout(() => {
             
              alert('로그아웃 되었습니다.');
              localStorage.clear();
              history.push("/main");
            });
          }
    }

    function logoClickHandler(){
        history.push({
            pathname: "/main_logged",
            state: {userInfo: props.userInfo}
        });
    }

    function goToStudy(){
        history.push({
            pathname: "/post",
            state: {userInfo: props.userInfo}
        });
    }

    function makeStudyPost(){
        history.push({
            pathname: "/post/write",
            state: {userInfo: props.userInfo}
        });
    }

    function nickNameClickHandler(){
        history.push({
            pathname: "/mypage",
            state: {userInfo: props.userInfo}
        });
    }

    function appModifyClickHandler(){
        if(props.userInfo.state == false || props.userInfo.state == undefined){
            history.push({ 
                pathname: "/reg_default_app",
                state: {userInfo: props.userInfo}
            });
        }
        else if(props.userInfo.state == true){
            history.push({ 
                pathname: "/mod_app_lists",
                state: {userInfo: props.userInfo}
            });
        }
    }

    return(
        <div>
        <div className="navbar">
        <img src="img/LOGO 1.png" className="navbarLogoImg"/>
        <div className="logo" onClick={logoClickHandler}>wantudy</div>
        <div className="join" onClick={goToStudy}>스터디 참여</div>
        <div className="make" onClick={makeStudyPost}>스터디 개설</div>
        <div className="apply" onClick={appModifyClickHandler}>스터디 신청서 등록</div>
        <div className="logout" onClick={LogoutClickHandler}>로그아웃</div>
        <div className="chatIcon">
            <img src="img/bi_send-fill.png"/>
        </div>
        <div className="userIcon" onClick={nickNameClickHandler}>
            <img src={props.userInfo.profileImage} className="userProfileImage"/>
        </div>
        
        </div>
        </div>
    )
}

export default withRouter(Navbar)
