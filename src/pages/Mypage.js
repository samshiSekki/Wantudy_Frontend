import React, {useState} from 'react';
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';
import '../css/mypage.css';


function Mypage(props) {
    let history = useHistory();
    let location = useLocation();
    const userInfo = location.state.userInfo;

    //const [newNickName, setNewNickName] = useState('');

    //console.log(userInfo.userId); //유저정보 출력 테스트


    function modifyClickHandler(){
        props.history.push({ 
            pathname: "/mod_nickname",
            state: {userInfo: userInfo}
        });
    }
    return (
        <>
            <Navbar userInfo={userInfo}/>
            <div className="mypageContainer">
                <div className="mypageTitle">
                    {userInfo.nickname}의 마이페이지
                </div>
                <div className="likedStudy">
                    찜한 스터디
                </div>
                <div className="studyStatus">
                    스터디 등록 현황
                </div>
                <div className="participatedStudy">
                    참여 스터디
                </div>
                <div className="assignment">
                    과제 관리
                </div>
                
                <button className="applyModBtn">지원서 수정</button>
                <button className="nickModBtn" onClick={modifyClickHandler}>닉네임 수정</button> 
            </div>
            <div className="Footer">
                <Footer/>
            </div>
        </>
    );
}
export default withRouter(Mypage)