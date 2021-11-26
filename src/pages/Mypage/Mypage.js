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
    
    const [openedStudy, setOpenedStudy] = useState('');
    const [openedAppDate, setOpenedAppDate] = useState('');
    const [openedProfileImage, setOpenedProfileImage] = useState('');
    const [openedUserName, setOpenedUserName] = useState('');

    
    const [ongoing, setOngoing] = useState('');
    const [ongoingSchedule, setOngoingSchedule] = useState(['',]);
    const [ongoing2, setOngoing2] = useState('');
    const [ongoing2Schedule, setOngoing2Schedule] = useState(['',]);

    const [assignment, setAssignment] = useState('');
    const [assignmentStudy, setAssignmentStudy] = useState('');
    const [assignmentDeadline, setAssignmentDeadline] = useState('');
    const [assignment2, setAssignment2] = useState('');
    const [assignment2Study, setAssignment2Study] = useState('');
    const [assignment2Deadline, setAssignment2Deadline] = useState('');

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
        if(response.data.msg != "개설한 스터디가 없습니다"){
            setOpenedStudy(response.data[0].study.studyName);

            if(response.data[0].applications[0] != null){
                setOpenedUserName(response.data[0].applications[0].nickname);
                setOpenedAppDate(response.data[0].applications[0].registered);
                setOpenedProfileImage(response.data[0].applications[0].profileImage);
            }
        }

        response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist`);
        //console.log(response);

        //console.log(response.data.studyManager.length);
        
        if(response.data.msg != '참여하는 스터디가 없습니다'){

            let newArr = [];
            if(response.data.studyManager[0] != null){
                for(let i=0; i<response.data.studyManager.length; i++){
                    newArr.push(response.data.studyManager[i]);
                }
            }
            //console.log(newArr);

            if(response.data.studyMember[0] != null){
                for(let i=0; i<response.data.studyMember.length; i++){
                    newArr.push(response.data.studyMember[i]);
                }
            }
            //console.log(newArr);
            //console.log(newArr[0].studyInfo.studyName);
            
            setOngoing(newArr[0].studyInfo.studyName);
            setOngoingSchedule(newArr[0].studyInfo.commonSchedule);
            
            if(newArr.length >= 2){
                setOngoing2(newArr[1].studyInfo.studyName);
                setOngoing2Schedule(newArr[1].studyInfo.commonSchedule);
            }

            let i=0;

            for(i=0; i<newArr.length; i++){
                if(newArr[i].todoAssignment.length == 1){
                    setAssignment(newArr[i].todoAssignment[0].assignment.assignmentName);
                    setAssignmentStudy(newArr[i].studyInfo.studyName);
                    setAssignmentDeadline(newArr[i].todoAssignment[0].assignment.deadline);

                    for(let j=i; j<newArr.length; j++){
                        if(newArr[j].todoAssignment.length >= 1){
                            setAssignment2(newArr[j].todoAssignment[0].assignment.assignmentName);
                            setAssignment2Study(newArr[j].studyInfo.studyName);
                            setAssignment2Deadline(newArr[j].todoAssignment[0].assignment.deadline);
                        }
                    }
                    break;
                }
                else if(newArr[i].todoAssignment.length >= 2){
                    setAssignment(newArr[i].todoAssignment[0].assignment.assignmentName);
                    setAssignmentStudy(newArr[i].studyInfo.studyName);
                    setAssignmentDeadline(newArr[i].todoAssignment[0].assignment.deadline);
                    setAssignment2(newArr[i].todoAssignment[1].assignment.assignmentName);
                    setAssignment2Study(newArr[i].studyInfo.studyName);
                    setAssignment2Deadline(newArr[i].todoAssignment[1].assignment.deadline);
                }
                
            }
        }
        
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

    function checkDeadline(deadline) {
        if (deadline.valueOf() > new Date().toISOString().valueOf()){
          return <div><img src="img/Ellipse999.png"/>모집중</div>
        }
        else{
          return <div><img src="img/Ellipse998.png"/>모집 완료</div>
        }
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
                                
                                {
                                    ongoingSchedule[0] == '' || ongoingSchedule[0] == null
                                    ? <div className="mypagePreviewDeadline">일정미확정</div>
                                    : <div className="mypagePreviewDeadline">매주 {ongoingSchedule[0][0]}요일 {ongoingSchedule[0][1]} - {parseInt(ongoingSchedule[0][ongoingSchedule[0].length - 1])+1}시</div>
                                }
                                
                                    <div className="previewOngoingStudyName">{ongoing}</div>
                            </div>
                    </div>
                    <div className="mypageMoreBtn2" onClick={moreOngoing}>+더보기</div>
                        <div className="subjectBlock">
                            <div className="mypagePreview5">
                                
                                {
                                    ongoing2Schedule[0] == '' || ongoing2Schedule[0] == null
                                    ? <div className="mypagePreviewDeadline">일정미확정</div>
                                    : <div className="mypagePreviewDeadline">매주 {ongoing2Schedule[0][0]}요일 {ongoing2Schedule[0][1]} - {parseInt(ongoing2Schedule[0][ongoing2Schedule[0].length - 1])+1}시</div>
                                }
                                
                                 <div className="previewOngoingStudyName">{ongoing2}</div>
                            </div>
                        </div>
                        
                    
                    <div className="participatedBlock">
                        <div className="myTempTitle">✍ 과제 관리</div>
                            <div className="mypagePreview">
                                {
                                    assignment == ''
                                    ? `과제가 없습니다`
                                    : <>
                                        
                                        <div className="mypagePreviewDeadline">{assignmentStudy}</div>
                                        
                                        <div className="previewAssignmentName">
                                            {assignment}
                                        </div>
                                        <div className="previewAssignmentDeadline">{assignmentDeadline.substr(0,10)} 마감</div>
                                    </>
                                }
                            </div>
                    </div>
                        <div className="subjectBlock">
                            <div className="mypagePreview5">
                                {
                                    assignment == ''
                                    ? `과제가 없습니다`
                                    : <>
                                        
                                        <div className="mypagePreviewDeadline">{assignment2Study}</div>
                                        
                                        <div className="previewAssignmentName">
                                            {assignment2}
                                        </div>
                                        <div className="previewAssignmentDeadline">{assignment2Deadline.substr(0,10)} 마감</div>
                                    </>
                                }
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
                        {
                        applied[0].studyName == null || applied[0].studyName == '신청한 스터디가 없습니다'
                        ?
                        null
                        :
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
                        }
                    </div>

                    <div className="openedBlock">
                        <div className="myTempTitle">🔎 개설한 스터디</div>
                        <div className="mypageMoreBtn" onClick={moreOpened}>+더보기</div>
                        <div className="mypagePreview2">
                            {openedStudy}
                        </div>
                        {
                        openedStudy == ''
                        ? `개설한 스터디가 없습니다`
                        :
                        openedUserName == ''
                        ? null
                        :<div>
                            <img src={openedProfileImage} className="previewReceivedUserProfileImg"/>
                            
                            <div className="appliedUserName">
                                {openedUserName + " "}
                            </div>
                            <div className="appliedUserDate">
                                {openedAppDate} 신청
                            </div>
                        </div>
                        }
                        
                    </div>
                
                </div>

                <div className="likedStudyContainer">
                    <div className="myTempTitle">🖇 관심 있는 스터디</div>
                    <div className="mypageMoreBtn" onClick={moreLiked}>+더보기</div>
                    <div className="likedPreviewContainer">
                        <div className="mypagePreview3">
                            {
                                liked[0].studyName == null || liked[0].studyName == '찜한 스터디가 없습니다'
                                ?   '찜한 스터디가 없습니다'
                                :
                                    <div className="likedStudyIndividualContainer">
                                        <div className="mypagePreviewDeadline">
                                        {checkDeadline(liked[0].deadline)}
                                        </div>
                                        <img src="img/Vector.png" className="mypageBookmarkimg"/>
                                        <br/>
                                        <div className="mypagelikedStudyName">
                                            {liked[0].studyName}
                                        </div>

                                    </div>
                            }
                        </div>
                        <div className="mypagePreview4">
                            {
                                liked[1].studyName == null || liked[1].studyName == '찜한 스터디가 없습니다'
                                ?   '찜한 스터디가 없습니다'
                                :
                                    <div className="likedStudyIndividualContainer">
                                        <div className="mypagePreviewDeadline">
                                        {checkDeadline(liked[1].deadline)}
                                        </div>
                                        <img src="img/Vector.png" className="mypageBookmarkimg"/>
                                        <br/>
                                        <div className="mypagelikedStudyName">
                                            {liked[1].studyName}
                                        </div>

                                    </div>
                            }
                    </div>
                    </div>
                </div>
                <br/>
                <div className="mypageBtnContainer">
                    <div className="mypageFooterBtn" onClick={appModifyClickHandler}>신청서 수정</div>
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