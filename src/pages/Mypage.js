import React, {useState, useEffect} from 'react';
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';
import '../css/mypage.css';


function Mypage(props) {
    let location = useLocation();
    const userInfo = location.state.userInfo;
    const [liked, setLiked] = useState("");
    const [applied, setApplied] = useState("");
    const [opened, setOpened] = useState("");
    const [ongoing, setOngoing] = useState("");

    useEffect(async()=>{
        let response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/like-studylist`);
        //console.log(response);
        setLiked(response.data.msg);

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/apply-studylist`);
        //console.log(response);
        setApplied(response.data.msg);

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/opened-studylist`);
        //console.log(response);
        setOpened(response.data.msg);

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist`);
        //console.log(response);
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
            pathname: "",
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
            <Navbar userInfo={userInfo}/>
            <div className="mypageContainer">
                <div className="mypageTitle">
                    {userInfo.nickname}의 마이페이지
                </div>
                <div className="temperature">내 열정온도 : {userInfo.temperature}</div>
                <div className="likedStudy">
                    찜한 스터디 <br/><br/>
                    {liked}<br/>
                    <button onClick={moreLiked}>더보기</button>
                </div>
                <div className="studyStatus">
                    스터디 등록 현황 <br/><br/>
                    {applied} <br/>
                    <button onClick={moreApplied}>더보기</button><br/>
                    {opened}<br/>
                    <button onClick={moreOpened}>더보기</button>
                </div>
                <div className="participatedStudy">
                    참여 스터디<br/><br/>
                    {ongoing}<br/>
                    <button onClick={moreOngoing}>더보기</button>
                </div>
                <div className="assignment">
                    과제 관리<br/>
                    <button onClick={moreSubject}>더보기</button>
                </div>
                
                <button className="applyModBtn" onClick={appModifyClickHandler}>지원서 수정</button>
                <button className="nickModBtn" onClick={nickModifyClickHandler}>닉네임 수정</button>
            </div>
            <div className="Footer">
                <Footer/>
            </div>
        </>
    );
}
export default withRouter(Mypage)