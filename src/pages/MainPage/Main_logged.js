import React, {useState} from 'react';
import { isDOMComponent } from 'react-dom/test-utils';
import Navbar from '../Navbar/Navbar.js';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';
import '../../css/mainpage.css';

function MainPageLogged(props) {
    let history = useHistory();
    let location = useLocation();
    const userInfo = location.state.userInfo;

    return (
        <>
            <Navbar userInfo={userInfo}/>
            <div className="bigContainer">
                <div className="container1">
                    캐치프레이즈, 일러스트..
                    <button className="registerBtn" onClick={()=>{history.push('/login')}}>회원가입</button>
                </div>

                <div className="container2">
                    개설, 신청, 관리 프로세스
                </div>

                <div className="container3">
                    <button className="joinBtn">스터디 참여하기</button>
                    <button className="makeBtn">스터디 개설하기</button>
                    <button className="applyBtn">스터디 신청서 등록하기</button>
                </div>

                <div className="container4">
                    
                </div>
            </div>
        </>
    )
}

export default MainPageLogged
