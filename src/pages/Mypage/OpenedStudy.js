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
          <div className="myMorePageContainer">
            <div className="myMorePageBanner">
              <div className="myMorePageTitleText">
                <p>🔎 개설한 스터디<br/>{userInfo.nickname}님이 개설한 스터디입니다.</p>
                
              </div>
            </div>

            {
                openedList[0] != ""
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

    return(
        <>
            <div className="likedListContainer">
                스터디 이름 : {props.openedList.study.studyName}
                <br/>
                <button>스터디 시작하기</button>
                <br/>
                신청서 목록 : <br/>
                {
                    props.openedList.applications.map((a,j)=>{
                        return <ReceivedAppList applications = {props.openedList.applications[j]} j={j} userInfo={props.userInfo} studyId={props.openedList.study.StudyId}/>
                    })
                }
            </div>
        </>
    )
}

function ReceivedAppList(props){
    const [modal, setModal] = useState(false);
    console.log(props.applications.state);

    return(
        <>
            <div>
                {props.applications.application.name}
            </div>
            <div>
                {props.applications.temperature}
            </div>
            <div>
                {
                    (props.applications.state == 0)
                    ? "대기중"
                    : (props.applications.state == 1
                        ? "수락됨"
                        : "거절됨")
                }
            </div>
            <button onClick={()=>{setModal(!modal)}}>상세보기</button>
            {
                modal === true
                ?<Modal apps = {props.applications} studyId={props.studyId}/>
                :null
            }
        </>
    )
}

function Modal(props){
    const acceptBtnClickHandler = async() => {
        const response = await axios.put(`http://13.209.66.117:8080/users/${props.apps.application.userId}/opened-studylist/manageMember/${props.apps.application.applicationId}`,{
            choice: "수락",
            studyId: props.studyId
        });
        
        console.log(response);
        console.log("hi");
    }

    return(
        <div>
            <div className="modalContainer">
                {`이름 : ${props.apps.application.name}`} <br/>
                {`나이 : ${props.apps.application.age}`} <br/>
                {`학교 : ${props.apps.application.school}`} <br/>

                <button onClick={acceptBtnClickHandler}>수락하기</button>
                <button>거절하기</button>
                <button>채팅</button>
            </div>
        </div>
    )
}

export default withRouter(OpenedStudy)
