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
      
        setOpenedList(response.data);
    },[]);

    return (
        <>
          <NavbarWhite userInfo={userInfo}/>
          <img src="img/Group 477.png" className="openedStudyImg"/>
          <div className="myMorePageContainer">
            <div className="myMorePageBanner">
              <div className="myMorePageTitleText">
                <p>đ ę°ė¤í ė¤í°ë <br/>{userInfo.nickname}ëė´ ę°ė¤í ė¤í°ëė ė ė˛­í ė ė˛­ė ëĒŠëĄėëë¤.</p>
                
              </div>
            </div>

            {
                (openedList[0] != "" && openedList.msg != "ę°ė¤í ė¤í°ëę° ėėĩëë¤")
                ? openedList.map((a,i)=>{
                    return <OpenedList openedList = {openedList[i]} i={i} userInfo={userInfo}/>
                })
                : "ę°ė¤í ė¤í°ëę° ėėĩëë¤"
            }

            
            </div>
            <Footer/>
        </>
    )
}

function OpenedList(props){
    let history = useHistory();

    const startStudyBtnClickHandler = async() => {
     
        const response = await axios.put(`http://13.209.66.117:8080/users/${props.userInfo.userId}/opened-studylist/${props.openedList.study.StudyId}`);
        window.location.reload();
    }



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
                    ?<div onClick={startStudyBtnClickHandler} className="startStudyBtn">ė¤í°ë ėėíę¸°</div>
                    :<div className="openedStudyStartedMsg">ė¤í°ëę° ėėëėėĩëë¤<br/>ė°¸ėŦ ė¤í°ë íė´ė§ėė ė¤í°ëëĨŧ íė¸íęŗ , ę´ëĻŦíė¸ė.</div>
                }
            </div>
        </>
    )
}

function ReceivedAppList(props){
    const [modal, setModal] = useState(false);
    let history = useHistory();
   

    function receivedAppViewDetailClickListner(){
        history.push({
            pathname: `/received_app`,
            state: {userInfo: props.userInfo, applications: props.applications, studyId:props.studyId}
          })
    }

    return(
        <>
            <div className = "receivedAppContainer">
                <img src={props.applications.profileImage} className="receivedUserProfileImg"/>
                <div className="receivedAppUserName">{props.applications.nickname}</div>
            
                <div className="fireEmoji">
                    đĨ
                </div>
                <div className = "receivedAppUserTemp">
                    {props.applications.temperature}Â°C
                </div>
                
                <div className="receivedAppViewDetail" onClick={receivedAppViewDetailClickListner}>
                    ėė¸ëŗ´ę¸°
                </div>
                <div className="receivedAppRegDate">
                    {props.applications.registered.substr(0,10)} ëąëĄ
                </div>

                <div className="receivedAppRegDate">
                    {
                        props.applications.state == 0
                        ? "ëę¸°ė¤"
                        : props.applications.state == 1
                            ? "ėëŊí¨"
                            : "ęą°ė í¨"
                    }
                </div>
            </div>

            

        </>
    )
}

export default withRouter(OpenedStudy)
