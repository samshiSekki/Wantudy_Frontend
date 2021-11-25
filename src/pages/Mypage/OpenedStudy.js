import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function OpenedStudy() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    let history = useHistory();
    const [openedList,setOpenedList]= useState(["",]);

    useEffect(async()=>{
        const response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/opened-studylist`);
        console.log(response);
        setOpenedList(response.data);
    },[]);

    return (
        <>
          <NavbarWhite userInfo={userInfo}/>
          <img src="img/Group 477.png" className="openedStudyImg"/>
          <div className="myMorePageContainer">
            <div className="myMorePageBanner">
              <div className="myMorePageTitleText">
                <p>🚀 개설한 스터디 <br/>{userInfo.nickname}님이 개설한 스터디에 신청한 신청서 목록입니다.</p>
                
              </div>
            </div>

            {
                (openedList[0] != "" && openedList.msg != "개설한 스터디가 없습니다")
                ? openedList.map((a,i)=>{
                    return <OpenedList openedList = {openedList[i]} i={i} userInfo={userInfo}/>
                })
                : "개설한 스터디가 없습니다"
            }

            
            </div>
            <Footer/>
        </>
    )
}

function OpenedList(props){
    let history = useHistory();

    const startStudyBtnClickHandler = async() => {
        console.log(props.userInfo.userId);
        console.log(props.openedList.study.StudyId);
        const response = await axios.put(`http://13.209.66.117:8080/users/${props.userInfo.userId}/opened-studylist/${props.openedList.study.StudyId}`);
        window.location.reload();
    }

    console.log(props.openedList.applications);

    return(
        <>
            <div className="openedListContainer">
                <div className="openedStudyTitle">
                    {props.openedList.study.studyName}
                </div>
                <br/>
                
                <br/>
                {
                    props.openedList.applications[0] != null
                    ?props.openedList.applications.map((a,j)=>{
                        return <ReceivedAppList applications = {props.openedList.applications[j]} j={j} userInfo={props.userInfo} studyId={props.openedList.study.StudyId}/>
                    })
                    :null
                }
                {
                    props.openedList.study.state == 0
                    ?<div onClick={startStudyBtnClickHandler} className="startStudyBtn">스터디 시작하기</div>
                    :<div className="openedStudyStartedMsg">스터디가 시작되었습니다<br/>참여 스터디 페이지에서 스터디를 확인하고, 관리하세요.</div>
                }
            </div>
        </>
    )
}

function ReceivedAppList(props){
    const [modal, setModal] = useState(false);
    let history = useHistory();
    //console.log(props.applications.state);

    function receivedAppViewDetailClickListner(){
        history.push({
            pathname: `/received_app`,
            state: {userInfo: props.userInfo, applications: props.applications, studyId:props.studyId}
          })
    }

    //console.log(props.applications);

    return(
        <>
            <div className = "receivedAppContainer">
                <img src={props.applications.profileImage} className="receivedUserProfileImg"/>
                <div className="receivedAppUserName">{props.applications.nickname}</div>
            
                <div className="fireEmoji">
                    🔥
                </div>
                <div className = "receivedAppUserTemp">
                    {props.applications.temperature}°C
                </div>
                
                <div className="receivedAppViewDetail" onClick={receivedAppViewDetailClickListner}>
                    상세보기
                </div>
                <div className="receivedAppRegDate">
                    {props.applications.registered.substr(0,10)} 등록
                </div>

                <div className="receivedAppRegDate">
                    {
                        props.applications.state == 0
                        ? "대기중"
                        : props.applications.state == 1
                            ? "수락함"
                            : "거절함"
                    }
                </div>
            </div>

            

        </>
    )
}

export default withRouter(OpenedStudy)
