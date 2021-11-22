import React, {useState, useEffect} from 'react';
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer.js';
import '../../css/mypage.css';


function Mypage(props) {
    let location = useLocation();
    const userInfo = location.state.userInfo;
    const [liked, setLiked] = useState([{studyName: null}, {studyName: null}]);
    const [applied, setApplied] = useState([{studyName: null, state: null},]);
    const [opened, setOpened] = useState([{study:{studyName: null}, applications:[{application: {name: null}, registered: null},]},]);
    const [ongoing, setOngoing] = useState(["",]);

    useEffect(async()=>{
        let response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/like-studylist`);
        //console.log(response);
        //setLiked(response.data.msg);
        response.data.msg == "찜한 스터디가 없습니다"
        ? function(){
            liked[0].studyName = "찜한 스터디가 없습니다";
            liked[1].studyName = "찜한 스터디가 없습니다";
        }()
        : function(){
            if(response.data.length == 1){
                liked[0] = response.data[0];
                liked[1].studyName = "찜한 스터디가 없습니다";
            }
            else{
                setLiked(response.data);
            }
        }()

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/apply-studylist`);
        //console.log(response.data);
        response.data.msg == "신청한 스터디가 없습니다"
        ? function(){
            applied[0].studyName = "신청한 스터디가 없습니다";
            applied[0].state=2;
        }()
        : setApplied(response.data)

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/opened-studylist`);
        //console.log(response);
        response.data.msg == "개설한 스터디가 없습니다"
        ? function(){
            opened[0].study.studyName = "개설한 스터디가 없습니다";
            opened[0].applications[0].application.name = "";
            opened[0].applications[0].registered = "";
        }()
        : setOpened(response.data)

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist`);
        console.log(response);
        /*
        response.data.msg == "참여하는 스터디가 없습니다"
        ? function(){
            
        }()*/
        //setOngoing(response.data.msg);
    },[]);


    function nickModifyClickHandler(){
        props.history.push({ 
            pathname: "/mod_nickname",
            state: {userInfo: userInfo}
        });
    }

    function appModifyClickHandler(){
        if(userInfo.state == false || userInfo.state == undefined){
            props.history.push({ 
                pathname: "/reg_default_app",
                state: {userInfo: userInfo}
            });
        }
        else if(userInfo.state == true){
            props.history.push({ 
                pathname: "/mod_app_lists",
                state: {userInfo: userInfo}
            });
        }
    }

    function moreLiked(){
        props.history.push({
            pathname: "/liked_study",
            state: {userInfo: userInfo}
        })
    }

    function moreApplied(){
        props.history.push({
            pathname: "/applied_study",
            state: {userInfo: userInfo}
        })
    }

    function moreOpened(){
        props.history.push({
            pathname: "/opened_study",
            state: {userInfo: userInfo}
        })
    }

    function moreOngoing(){
        props.history.push({
            pathname: "/ongoing_study",
            state: {userInfo: userInfo}
        })
    }
    
    return (
        <>
            <NavbarWhite userInfo={userInfo}/>
            <img src="img/Group 418.png" className="mypageImg"/>
            <div className="mypageContainer">
                <div className="mypageBanner">
                    <div className="mypageTitleText">
                    <p>{userInfo.nickname}님의 마이페이지👋<br/>
                    스터디에 관한 모든 것을 관리하는 당신의 스터디비서 원터디입니다!
                    </p>
                
                    </div>
                </div>

                <div className="temperatureContainer">
                    <div className="myTempTitle">🔥 나의 열정 온도</div>
                    <img src="img/Group 316.png"/>
                    <div className="myTempStatus">
                        {userInfo.nickname}님의 현재 열정 온도는 {userInfo.temperature}°C 입니다.
                    </div>
                </div>

                <div className="participatedStudyContainer">
                    <div className="participatedBlock">
                        <div className="myTempTitle">📋 참여 스터디</div>
                            <div className="mypagePreview">
                                {ongoing}
                            </div>
                    </div>
                        <div className="subjectBlock">
                            <div className="mypagePreview">
                                {ongoing}
                            </div>
                        </div>
                    <div className="mypageMoreBtn" onClick={moreOngoing}>+더보기</div>
                    <div className="participatedBlock">
                        <div className="myTempTitle">✍ 과제 관리</div>
                            <div className="mypagePreview">
                                {ongoing}
                            </div>
                    </div>
                        <div className="subjectBlock">
                            <div className="mypagePreview">
                                {ongoing}
                            </div>
                        </div>

                    

                </div>

                
                <div className="applyStatusContainer">
                    <div className="appliedBlock">
                        <div className="myTempTitle">🚀 신청한 스터디</div>
                        <div className="mypageMoreBtn" onClick={moreApplied}>+더보기</div>
                        <div className="mypagePreview2">
                            {applied[0].studyName}
                        </div>
                        {/*
                        <div className="applyBlockStatus">
                            {
                                applied[0].state == 0
                                ? "수락 대기중"
                                    : applied[0].state == 1
                                    ? "수락됨"
                                    : applied[0].state == 2
                                        ? "거절됨"
                                        : ""
                            }
                        </div>
                        */}
                    </div>

                    <div className="openedBlock">
                        <div className="myTempTitle">🔎 개설한 스터디</div>
                        <div className="mypageMoreBtn" onClick={moreOpened}>+더보기</div>
                        <div className="mypagePreview2">
                            {opened[0].study.studyName}
                        </div>
                        {/*
                        <div>
                            <div className="appliedUserName">
                                {opened[0].applications[0].application.name + " "}
                            </div>
                            <div className="appliedUserDate">
                                {opened[0].applications[0].registered} 신청
                            </div>
                        </div>
                        */}
                        
                    </div>
                
                </div>

                <div className="likedStudyContainer">
                    <div className="myTempTitle">🖇 관심 있는 스터디</div>
                    <div className="mypageMoreBtn" onClick={moreLiked}>+더보기</div>
                    <div className="likedPreviewContainer">
                        <div className="mypagePreview3">
                            {liked[0].studyName}
                            <img src="img/Vector.png" className="mypageBookmarkimg"/>
                        </div>
                        <div className="mypagePreview4">
                            {liked[1].studyName}
                            <img src="img/Vector.png" className="mypageBookmarkimg"/>
                    </div>
                    </div>
                </div>
                <br/>
                <div className="mypageBtnContainer">
                    <div className="mypageFooterBtn" onClick={appModifyClickHandler}>지원서 수정</div>
                    <div className="mypageFooterBtn" onClick={nickModifyClickHandler}>닉네임 수정</div>
                </div>
            </div>
            <div className="Footer">
                <Footer/>
            </div>
        </>
    );
}
export default withRouter(Mypage)