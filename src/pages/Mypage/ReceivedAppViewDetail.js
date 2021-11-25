import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function ReceivedAppViewDetail(props) {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    const applications = location.state.applications;
    const studyId = location.state.studyId;
    let history = useHistory();
    console.log(applications);

    //console.log(applications.application.userId);
    //console.log(applications.application.applicationId);
    //console.log(studyId);

    const acceptBtnClickHandler = async() => {
        const response = await axios.put(`http://13.209.66.117:8080/users/${applications.application.userId}/opened-studylist/manageMember/${applications.application.applicationId}`,{
            choice: "수락",
            studyId: studyId
        });
        alert("수락했습니다! 해당 스터디 페이지에서 확인하세요");
        
        history.push({
            pathname: "/opened_study",
            state: {userInfo: userInfo}
        })
    }

    const declineBtnClickHandler = async() => {
        const response = await axios.put(`http://13.209.66.117:8080/users/${applications.application.userId}/opened-studylist/manageMember/${applications.application.applicationId}`,{
            choice: "거절",
            studyId: studyId
        });
        alert("거절했습니다! 해당 스터디 페이지에서 확인하세요");
        
        history.push({
            pathname: "/opened_study",
            state: {userInfo: userInfo}
        })
    }

    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
                <div className="myMorePageContainer">
                    <div className="receivedAppViewTitle">
                        {applications.nickname}님의 신청서입니다!
                        <div className="recivedAppRegisteredDate">{applications.registered.substr(0,10)} 등록</div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            신청서명
                        </div>
                        <div className="appViewdetailContainerContent">
                            {applications.application.applicationName}
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            성명
                        </div>
                        <div className="appViewdetailContainerContent">
                            {applications.application.name}
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            성별
                        </div>
                        <div className="appViewdetailContainerContent">
                            {applications.application.gender}
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            나이
                        </div>
                        <div className="appViewdetailContainerContent">
                            만 {applications.application.age}세
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            소속
                        </div>
                        <div className="appViewdetailContainerContent">
                            {applications.application.school}
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            전공
                        </div>
                        <div className="appViewdetailContainerContent">
                            {applications.application.major}
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            거주지
                        </div>
                        <div className="appViewdetailContainerContent">
                            {applications.application.address}
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            이력
                        </div>
                        <div className="appViewdetailContainerContent">
                            {applications.application.specification}
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            관심 분야
                        </div>
                        <div className="appViewdetailContainerContent">
                            {
                                applications.application.interests.map((a,i)=>{
                                    if(i == applications.application.interests.length - 1)
                                        return a
                                    else
                                        return a + ', '
                                })
                            }
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            자신을 나타내는 키워드
                        </div>
                        <div className="appViewdetailContainerContent">
                            {
                                applications.application.keyword.map((a,i)=>{
                                    if(i == applications.application.keyword.length - 1)
                                        return a
                                    else
                                        return a + ', '
                                })
                            }
                        </div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            스터디장에게 전달할 메시지
                        </div>
                        <div className="appViewdetailContainerContent">
                            {applications.message}
                        </div>
                    </div>

                    <img src="img/Group 258.png" className="raChatBtn"/>
                    <img src="img/Group 322.png" className="raDeclineBtn" onClick={declineBtnClickHandler}/>
                    <img src="img/Group 500.png" className="raAcceptBtn" onClick={acceptBtnClickHandler}/>
                </div>
            <Footer/>
        </div>
    )
}

export default ReceivedAppViewDetail
