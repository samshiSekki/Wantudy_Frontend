import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function CommonSchedule() {
    const location = useLocation();
    const history = useHistory();
    const userInfo = location.state.userInfo;
    const ongoingStudy = location.state.ongoingStudy;
    const isManager = location.state.isManager;

    const studyInfo = ongoingStudy.studyInfo;
    const participants = ongoingStudy.participants;
    const [schedule, setSchedule] = useState(
        [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        ]
    )

    useEffect(async()=>{
        let response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist/${studyInfo.StudyId}/schedule-common`);
        console.log(response);

        if(response.data[0] != null){
            for(let i=0; i<response.data.length; i++){
                if(response.data[i][0] == '월'){
                    for(let j=1; j<response.data[i].length; j++){
                        let newArr = [...schedule];
                        newArr[0][parseInt(response.data[i][j])-4] = true;
                        setSchedule(newArr);
                    }
                }

                else if(response.data[i][0] == '화'){
                    for(let j=1; j<response.data[i].length; j++){
                        let newArr = [...schedule];
                        newArr[1][parseInt(response.data[i][j])-4] = true;
                        setSchedule(newArr);
                    }
                }

                else if(response.data[i][0] == '수'){
                    for(let j=1; j<response.data[i].length; j++){
                        let newArr = [...schedule];
                        newArr[2][parseInt(response.data[i][j])-4] = true;
                        setSchedule(newArr);
                    }
                }

                else if(response.data[i][0] == '목'){
                    for(let j=1; j<response.data[i].length; j++){
                        let newArr = [...schedule];
                        newArr[3][parseInt(response.data[i][j])-4] = true;
                        setSchedule(newArr);
                    }
                }

                else if(response.data[i][0] == '금'){
                    for(let j=1; j<response.data[i].length; j++){
                        let newArr = [...schedule];
                        newArr[4][parseInt(response.data[i][j])-4] = true;
                        setSchedule(newArr);
                    }
                }

                else if(response.data[i][0] == '토'){
                    for(let j=1; j<response.data[i].length; j++){
                        let newArr = [...schedule];
                        newArr[5][parseInt(response.data[i][j])-4] = true;
                        setSchedule(newArr);
                    }
                }

                else if(response.data[i][0] == '일'){
                    for(let j=1; j<response.data[i].length; j++){
                        let newArr = [...schedule];
                        newArr[6][parseInt(response.data[i][j])-4] = true;
                        setSchedule(newArr);
                    }
                }
            }
        }
    },[]);

    const selectSchedule = async(day) => {
        let response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist/${studyInfo.StudyId}/schedule-common`);
        console.log(response);
        console.log(day);
        if(isManager == 1){
            for(let i=0; i<response.data.length; i++){
                if(day == response.data[i][0]){
                    console.log(response.data[i]);
                    let result = window.confirm(`스터디 진행시간을\n[매주 ${day}요일 ${response.data[i][1]} - ${parseInt(response.data[i][response.data[i].length-1])+1}]로 확정하시겠습니까?`);
                    if(result == true){
                        alert("확정했습니다!\n해당 스터디 페이지에서 확인하세요.");
                        response = await axios.put(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist/${studyInfo.StudyId}/schedule-common`,{
                            time: [response.data[i]]
                        });
                        history.push({ 
                            pathname: "/ongoing_study_detail",
                            state: {userInfo: userInfo, ongoingStudy: ongoingStudy, isManager: isManager}
                        });
                    }

                }
            }
        }
    }

    function viewIndividualSchedule(){
        history.push({ 
            pathname: "/schedule",
            state: {userInfo: userInfo, isManager: isManager, ongoingStudy: ongoingStudy}
        });
    }

    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
            <div className="schedulePageContainer">
                <div className="ongoingStudyDetailTitle">
                    {studyInfo.studyName}
                </div>

                <div className="participantsPics">
                    <div className="participantsPicsContainer">
                    {
                        participants.map((a,i)=>{
                            if(participants[i].userId == studyInfo.userId){
                                return (
                                    <div className="participantBox">
                                    <img src="img/Group 420.png" className="managerLabelImg"/>
                                    <img src={ongoingStudy.participants[i].profileImage} className="participantsProfileImg"/>
                                    <div className="">{ongoingStudy.participants[i].nickname}</div>
                                    </div>
                                )
                            }
                            else{
                                return (
                                    <div className="participantBox">
                                    <img src={ongoingStudy.participants[i].profileImage} className="participantsProfileImg"/>
                                    <div className="">{ongoingStudy.participants[i].nickname}</div>
                                    </div>
                                )
                            }
                        })
                    }
                    </div>
                </div>
                <div className="scheduleContainer">
                    <div className="dayOfWeekContainer">
                        <div className="dayOfWeek">월</div>
                        <div className="dayOfWeek">화</div>
                        <div className="dayOfWeek">수</div>
                        <div className="dayOfWeek">목</div>
                        <div className="dayOfWeek">금</div>
                        <div className="dayOfWeek">토</div>
                        <div className="dayOfWeek">일</div>
                    </div>
                    <div className="timeContainer">
                        {
                            schedule[0].map((a,i)=>{
                                return <div className="timeNumber">{i+4}</div>
                            })
                        }
                        <div className="timeNumber">00</div>
                        
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                if(schedule[0][i] == false){
                                    return <div className="timeTable"/>
                                }
                                else{
                                    return <div className= "commonTimeTableColored" onClick={()=>{selectSchedule('월')}}/>
                                }
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                if(schedule[1][i] == false){
                                    return <div className="timeTable"/>
                                }
                                else{
                                    return <div className= "commonTimeTableColored" onClick={()=>{selectSchedule('화')}}/>
                                }
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                if(schedule[2][i] == false){
                                    return <div className="timeTable"/>
                                }
                                else{
                                    return <div className= "commonTimeTableColored" onClick={()=>{selectSchedule('수')}}/>
                                }
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                if(schedule[3][i] == false){
                                    return <div className="timeTable"/>
                                }
                                else{
                                    return <div className= "commonTimeTableColored" onClick={()=>{selectSchedule('목')}}/>
                                }
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                if(schedule[4][i] == false){
                                    return <div className="timeTable"/>
                                }
                                else{
                                    return <div className= "commonTimeTableColored" onClick={()=>{selectSchedule('금')}}/>
                                }
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                if(schedule[5][i] == false){
                                    return <div className="timeTable"/>
                                }
                                else{
                                    return <div className= "commonTimeTableColored" onClick={()=>{selectSchedule('토')}}/>
                                }
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                if(schedule[6][i] == false){
                                    return <div className="timeTable"/>
                                }
                                else{
                                    return <div className= "commonTimeTableColored" onClick={()=>{selectSchedule('일')}}/>
                                }
                            })
                        }
                    </div>
                </div>
                <div className="viewCommonScheduleBtn" onClick={viewIndividualSchedule}>개인 시간대 보기</div>
            </div>

            <Footer/>
        </div>
    )
}

export default CommonSchedule
