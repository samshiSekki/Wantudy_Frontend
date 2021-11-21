import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function OngoingStudy() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    let history = useHistory();
    const [ongoingList,setOngoingList]= useState(["",]);
    const [managerList, setManagerList] = useState(["",]);
    const [memberList, setMemberList] = useState(["",]);

    useEffect(async()=>{
        const response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist`);
        console.log(response);
        setOngoingList(response.data);
        setManagerList(ongoingList.studyManager);
        setMemberList(ongoingList.studyMember);
    },[]);

    const [activeIndex, setActiveIndex] = useState(0);

    function tabClickHandler(index){
        setActiveIndex(index);
    }

    console.log(managerList);
    console.log(memberList);

    /*
    let i=0;
    const tabContArr = [{tabTitle:null, tabCont: null},{tabTitle:null, tabCont: null},{tabTitle:null, tabCont: null}];
    for(i=0; i<managerList.length; i++){
        tabContArr[i].tabTitle = <li onClick={tabClickHandler(i)}>{managerList[i].studyInfo.studyName}</li>
        tabContArr[i].tabCont = <StudyNameTab/>
    }
    if((managerList.length<3) && (memberList.length != 0)){
        for(let j=i; j<3; j++){
            tabContArr[j].tabTitle = <li onClick={tabClickHandler(j)}>{managerList[i].studyInfo.studyName}</li>
            tabContArr[j].tabCont = <StudyNameTab/>
        }
    }*/

    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
            <img src="img/Group 478.png" className="ongoingStudyImg"/>
            <div className="myMorePageContainer">
                <div className="myMorePageBanner">
                    <div className="myMorePageTitleText">
                    <p>📋 참여 스터디 <br/>{userInfo.nickname}님이 참여 중인 스터디의 일정 및 과제 안내입니다.</p>
                    </div>
                </div>
                {/*
                <div class="ongoingStudyNameTab">
                    {
                        managerList.length != 0
                        ?managerList.map((a,i)=>{
                            return <StudyNameTab managerList = {managerList[i]} i={i} userInfo={userInfo}/>
                        })
                        : null
                    }
                    {
                        memberList.length != 0
                        ?memberList.map((a,i)=>{
                            return <StudyNameTab memberList = {memberList[i]} i={i} userInfo={userInfo}/>
                        })
                        : null
                    }
                </div>
                */}
            </div>

            <Footer/>
        </div>
    )
}

function StudyNameTab(props){

    return(
        <div className="ongoingStudyNameTabText">
            {/*props.managerList.studyInfo.studyName*/}
            Test
        </div>
    )
}

export default OngoingStudy
