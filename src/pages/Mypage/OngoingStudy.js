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
        //console.log(userInfo);
        const response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist`);
        console.log(response);
        //console.log(response.data.studyManager);
        //console.log(response.data.studyMember);

        if(response.data.msg == '참여하는 스터디가 없습니다'){

        }
        else{
            setManagerList(response.data.studyManager);
            setMemberList(response.data.studyMember);
        }

    },[]);


    //console.log(managerList);
    //console.log(memberList);

    /*
    function showOngoingList(list,length){
        if(length != 0){
            for(let i=0; i<list.length; i++){
                return <OngoingStudyList ongoingStudy = {list[i]} i = {i} userInfo={userInfo}/>
            }
        }
    }*/


    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
            <img src="img/Group 478.png" className="ongoingStudyImg"/>
            <div className="myMorePageContainer">
                <div className="myMorePageBanner">
                    <div className="myMorePageTitleText">
                    <p>📋 참여 스터디 <br/>{userInfo.nickname}님이 참여 중인 스터디 목록입니다.</p>
                    </div>
                </div>

                {/*
                    showOngoingList(managerList, managerList.length)*/
                }
                
                {
                    (managerList.length > 0 && managerList[0] != "")
                    ? managerList.map((a,i)=>{
                        return <OngoingStudyList ongoingStudy = {managerList[i]} i = {i} userInfo={userInfo} isManager={1}/>
                    })
                    : null
                    
                }

                {
                    (memberList.length > 0 && memberList[0] != "")
                    ? memberList.map((a,i)=>{
                        return <OngoingStudyList ongoingStudy = {memberList[i]} i = {i} userInfo={userInfo} isManager={0}/>
                    })
                    : null
                    
                }

            </div>

            <Footer/>
        </div>
    )
}

function OngoingStudyList(props){
    let history = useHistory();

    function ongoingStudyBtnClickHandler(){
        history.push({ 
            pathname: "/ongoing_study_detail",
            state: {userInfo: props.userInfo, ongoingStudy: props.ongoingStudy, isManager: props.isManager}
        });
    }

    //console.log(props.isManager);

    return(
        <div className="ongoingStudyListContainer">
            <div className="ongoingStudyName" onClick={ongoingStudyBtnClickHandler}>
                {props.ongoingStudy.studyInfo.studyName}
            </div>
        </div>
    )
}

export default OngoingStudy
