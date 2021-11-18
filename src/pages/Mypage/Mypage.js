import React, {useState, useEffect} from 'react';
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer.js';
import '../../css/mypage.css';


function Mypage(props) {
    let location = useLocation();
    const userInfo = location.state.userInfo;
    const [liked, setLiked] = useState("");
    const [applied, setApplied] = useState([{studyName: null},]);
    const [opened, setOpened] = useState([{study:{studyName: null}},]);
    const [ongoing, setOngoing] = useState(["",]);

    useEffect(async()=>{
        let response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/like-studylist`);
        //console.log(response);
        setLiked(response.data.msg);

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/apply-studylist`);
        //console.log(response.data);
        response.data.msg == "신청한 스터디가 없습니다"
        ? applied[0].studyName = "신청한 스터디가 없습니다"
        : setApplied(response.data)

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/opened-studylist`);
        console.log(response);
        response.data.msg == "개설한 스터디가 없습니다"
        ? opened[0].study.studyName = "개설한 스터디가 없습니다"
        : setOpened(response.data)

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist`);
        console.log(response);
        setOngoing(response.data.msg);
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
            pathname: "",
            state: {userInfo: userInfo}
        })
    }

    function moreOngoing(){
        props.history.push({
            pathname: "",
            state: {userInfo: userInfo}
        })
    }

    function moreSubject(){
        props.history.push({
            pathname: "",
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
                    <div className="myTempTitle">✍ 과제 관리</div>
                    <div className="mypagePreview">
                        {ongoing}
                    </div>
                    </div>
                    <div className="mypageMoreBtn" onClick={moreOngoing}>+더보기</div>
                </div>

                
                <div className="applyStatusContainer">
                    <div className="appliedBlock">
                        <div className="myTempTitle">🚀 신청한 스터디</div>
                        <div className="mypageMoreBtn" onClick={moreApplied}>+더보기</div>
                        <div className="mypagePreview">
                            {applied[0].studyName}
                        </div>  
                    </div>

                    <div className="openedBlock">
                        <div className="myTempTitle">🔎 개설한 스터디</div>
                        <div className="mypageMoreBtn" onClick={moreOpened}>+더보기</div>
                        <div className="mypagePreview">
                            {opened[0].study.studyName}
                        </div>
                    </div>
                
                </div>

                <div className="likedStudyContainer">
                    <div className="myTempTitle">🖇 관심 있는 스터디</div>
                    <div className="mypageMoreBtn" onClick={moreLiked}>+더보기</div>
                    <div className="mypagePreview">
                        {liked}
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