import React, {useState, useEffect} from 'react'
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import Footer from '../Footer/Footer';
import NavbarWhite from '../Navbar/NavbarWhite';
import '../../css/mypageMore.css';

function AppliedStudy() {
    let location = useLocation();
    const userInfo = location.state.userInfo;
    const [appliedList, setAppliedList] = useState(["",]);

    useEffect(async()=>{
      const response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/apply-studylist`);
      console.log(response.data);
      setAppliedList(response.data);
      
  },[]);
  console.log(appliedList);

    return (
        <div className>
          <NavbarWhite userInfo={userInfo}/>
          <img src="img/Group 408.png" className="appliedStudyImg"/>
          <div className="myMorePageContainer">
            <div className="myMorePageBanner">
              <div className="myMorePageTitleText">
                <p>🚀 신청한 스터디<br/>{userInfo.nickname}님이 신청한 스터디 현황입니다.</p>
                
              </div>
            </div>

            {
                  appliedList.msg != "신청한 스터디가 없습니다"
                  ? appliedList.map((a,i)=>{
                      return <AppliedList appliedList = {appliedList[i]} i={i} userInfo={userInfo}/>
                  })
                  : "신청한 스터디가 없습니다"
                }

            
          </div>
          <Footer/>
        </div>
    )
}

function AppliedList(props){
  let history = useHistory();

  const applyCancelBtnListner = async() => {
    await axios.delete(`http://13.209.66.117:8080/users/${props.userInfo.userId}/apply-studylist/${props.appliedList.application.applicationId}`);
    window.location.reload();
  }

  function modAppBtnListner(){
    history.push({ 
      pathname: "/mod_default_app",
      state: {userInfo: props.userInfo, apps: props.appliedList.application}
    });
  }

  return(
      <>
        <div>
          <div className="appliedList">
            <div className="appliedStudyName">
              {props.appliedList.studyName}
              <div className="applyStatus">
              {
                props.appliedList.state == 0
                ? "수락 대기중"
                : props.appliedList.state == 1
                  ? "수락됨"
                  : "거절됨"
              }
            </div>
            </div>
            
            <div className="appliedStudyBtnContainer">
                
                <div className="appliedStudyBtn" onClick={applyCancelBtnListner}>
                  신청 취소
                </div>
                <div className="appliedStudyBtn" onClick={modAppBtnListner}>
                  신청서 수정
                </div>
                <div className="appliedStudyBtn2">
                  스터디장과 채팅
                </div>
            </div>
          </div>
          <hr/>
        </div>
      </>
  )
}

export default AppliedStudy
