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
    const studyInfo = location.state.studyInfo;
    const isManager = location.state.isManager;
    const participants = location.state.participants;

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

    function changeColor(n, i){
        let newArr = [...schedule];
        newArr[n][i] = !newArr[n][i];
        setSchedule(newArr);
    }

    console.log(participants);

    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
            <div className="myMorePageContainer">
                <div className="ongoingStudyDetailTitle">
                    {studyInfo.studyName}
                </div>

                <div className="participantsPics">
                    <div className="participantsPicsContainer">
                    {
                        participants.map((a,i)=>{
                            if(participants[i].userId == studyInfo.userId){
                                return (
                                    <>
                                    <img src="img/Group 420.png" className="managerLabelImg"/>
                                    <img src={participants[i].profileImage} className="participantsProfileImg"/>
                                    </>
                                )
                            }
                            else{
                                return <img src={participants[i].profileImage} className="participantsProfileImg"/>
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

                <div className="scheduleBtns">수정</div>
                <div className="scheduleBtns">저장</div>

            </div>

            <Footer/>
        </div>
    )
}

export default Schedule
