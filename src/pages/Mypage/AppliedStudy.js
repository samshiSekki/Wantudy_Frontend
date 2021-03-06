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
      setAppliedList(response.data);
      
  },[]);

    return (
        <div className>
          <NavbarWhite userInfo={userInfo}/>
          <img src="img/Group 408.png" className="appliedStudyImg"/>
          <div className="myMorePageContainer">
            <div className="myMorePageBanner">
              <div className="myMorePageTitleText">
                <p>đ ė ė˛­í ė¤í°ë<br/>{userInfo.nickname}ëė´ ė ė˛­í ė¤í°ë ííŠėëë¤.</p>
                
              </div>
            </div>

            {
                  appliedList.msg != "ė ė˛­í ė¤í°ëę° ėėĩëë¤"
                  ? appliedList.map((a,i)=>{
                      return <AppliedList appliedList = {appliedList[i]} i={i} userInfo={userInfo}/>
                  })
                  : "ė ė˛­í ė¤í°ëę° ėėĩëë¤"
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
                ? "ėëŊ ëę¸°ė¤"
                : props.appliedList.state == 1
                  ? "ėëŊë¨"
                  : "ęą°ė ë¨"
              }
            </div>
            </div>
            
            <div className="appliedStudyBtnContainer">
                
                <div className="appliedStudyBtn" onClick={applyCancelBtnListner}>
                  ė ė˛­ ėˇ¨ė
                </div>
                <div className="appliedStudyBtn" onClick={modAppBtnListner}>
                  ė ė˛­ė ėė 
                </div>
                <div className="appliedStudyBtn2">
                  ė¤í°ëėĨęŗŧ ėąí
                </div>
            </div>
          </div>
          <hr/>
        </div>
      </>
  )
}

export default AppliedStudy
