import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function ReceivedAppViewDetail() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    const applications = location.state.applications;
    console.log(applications);

    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
                <div className="myMorePageContainer">
                    <div className="ongoingStudyDetailTitle">
                        {applications.application.name}님의 신청서입니다!
                        <div className="recivedAppRegisteredDate">{applications.registered.substr(0,10)} 등록</div>
                    </div>

                    <div className="appViewDetailContainer">
                        <div className="appViewdetailContainerTitle">
                            신청서명
                        </div>
                        <div className="appViewdetailContainerContent">
                            {}
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
                            {}
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
                            {applications.application.message}
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default ReceivedAppViewDetail
