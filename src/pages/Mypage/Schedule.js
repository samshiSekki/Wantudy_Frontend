import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function Schedule() {
    const location = useLocation();
    const history = useHistory();
    const userInfo = location.state.userInfo;
    const ongoingStudy = location.state.ongoingStudy;
    const isManager = location.state.isManager;

    const studyInfo = ongoingStudy.studyInfo;
    const participants = ongoingStudy.participants;

    console.log(studyInfo.StudyId);

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
        const response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist/${studyInfo.StudyId}/schedule`);
        console.log(response);

        if(response.data[0] != null){
            for(let i=0; i<7; i++){
                if(response.data[0].time[i][0] != null){
                    for(let j=1; j<response.data[0].time[i].length; j++){
                        let newArr = [...schedule];
                        newArr[i][parseInt(response.data[0].time[i][j])-4] = true;
                        setSchedule(newArr);
                    }
                }
            }
        }
    },[]);

    console.log(schedule);

    //console.log(userInfo);
    //console.log(studyInfo);

    function changeColor(n, i){
        let newArr = [...schedule];
        newArr[n][i] = !newArr[n][i];
        setSchedule(newArr);
    }

    let time = [["월"],["화"],["수"],["목"],["금"],["토"],["일"]]
        

    const saveScheduleClickListner = async()=>{
        for(let i=0; i<7; i++){
            let flag = 0;
            for(let j=0; j<20; j++){
                if(schedule[i][j] == false){
                    flag++
                }
                if(j==19 && flag==20)
                    time[i][0] = null;
            }
        }

        for(let i=0; i<7; i++){
            for(let j=0; j<20; j++){
                if(schedule[i][j] == true){
                    time[i].push(`${j+4}`)
                }
            }
        }

        console.log(time);

        let response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist/${studyInfo.StudyId}/schedule`);
        console.log(response);

        if(response.data[0] == null){
            let response = await axios.post(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist/${studyInfo.StudyId}/schedule`,{
                time: time
            });
        }
        else{
            let response = await axios.put(`http://13.209.66.117:8080/users/${userInfo.userId}/ongoing-studylist/${studyInfo.StudyId}/schedule`,{
                time: time
            });
        }

        console.log(response);
        alert("시간표가 저장되었습니다");
    }

    function viewCommonSchedule(){
        history.push({ 
            pathname: "/common_schedule",
            state: {userInfo: userInfo, isManager: isManager, ongoingStudy: ongoingStudy}
        });
    }

    //console.log(participants);

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
                                return <div className={schedule[0][i] == false? "timeTable" : "timeTableColored"} onClick={()=>changeColor(0, i)}/>
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                return <div className={schedule[1][i] == false? "timeTable" : "timeTableColored"} onClick={()=>changeColor(1, i)}/>
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                return <div className={schedule[2][i] == false? "timeTable" : "timeTableColored"} onClick={()=>changeColor(2, i)}/>
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                return <div className={schedule[3][i] == false? "timeTable" : "timeTableColored"} onClick={()=>changeColor(3, i)}/>
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                return <div className={schedule[4][i] == false? "timeTable" : "timeTableColored"} onClick={()=>changeColor(4, i)}/>
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                return <div className={schedule[5][i] == false? "timeTable" : "timeTableColored"} onClick={()=>changeColor(5, i)}/>
                            })
                        }
                    </div>
                    <div className="tablesOfDayOfWeek">
                        {
                            schedule[0].map((a, i)=>{
                                return <div className={schedule[6][i] == false? "timeTable" : "timeTableColored"} onClick={()=>changeColor(6, i)}/>
                            })
                        }
                    </div>
                </div>

                {/*
                <div className="scheduleBtns">수정</div>
                */}
                <div className="scheduleBtns" onClick={saveScheduleClickListner}>저장</div>

                <div className="viewCommonScheduleBtn" onClick={viewCommonSchedule}>공통 시간대 보기</div>

            </div>

            <Footer/>
        </div>
    )
}

export default Schedule
