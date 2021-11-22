import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function OngoingStudyDetail() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    const ongoingStudy = location.state.ongoingStudy;
    const isManager = location.state.isManager;
    const history = useHistory();

    console.log(ongoingStudy);
    console.log(isManager);

    function scheduleBtnClickHandler(){
        history.push({ 
            pathname: "/schedule",
            state: {userInfo: userInfo, studyInfo: ongoingStudy.studyInfo, isManager: isManager, participants: ongoingStudy.participants}
          });
    }

    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
            <div className="myMorePageContainer">
                <div className="ongoingStudyDetailTitle">
                    {ongoingStudy.studyInfo.studyName}
                </div>
                <div className="participantsPics">
                    <div className="participantsPicsContainer">
                    {
                        ongoingStudy.participants.map((a,i)=>{
                            if(ongoingStudy.participants[i].userId == ongoingStudy.studyInfo.userId){
                                return (
                                    <>
                                    <img src="img/Group 420.png" className="managerLabelImg"/>
                                    <img src={ongoingStudy.participants[i].profileImage} className="participantsProfileImg"/>
                                    </>
                                )
                            }
                            else{
                                return <img src={ongoingStudy.participants[i].profileImage} className="participantsProfileImg"/>
                            }
                        })
                    }
                    </div>
                </div>
                <div className="ongoingDetailContainers">
                    <div className="ongoingSubTitle">📆 스터디 일정</div>

                    <div className="scheduleBox">
                    스터디 일정이 아직 확정되지 않았습니다.<br/> 아래 버튼을 통해 스터디원과 일정을 조율하여 확정해주세요.<br/>
                    <div className="scheduleAdjustBtn" onClick={scheduleBtnClickHandler}>일정 조율하기</div>
                    </div>
                </div>

                <div className="ongoingDetailContainers">
                    <div className="ongoingSubTitle">✍ 해야할 과제</div>

                    <div className="subjectTodoBox">
                    
                    </div>
                </div>
                {
                    isManager == 1
                    ? (
                        <div className="ongoingDetailContainers">
                        <div className="ongoingSubTitle">📂 관리할 과제</div>

                        <div className="subjectTodoBox">
                    
                        </div>
                        </div>
                    )
                    : null
                }

                <div className="ongoingDetailContainers">
                    <div className="ongoingSubTitle">🔥 상호 열정 평가</div>

                    <div className="scheduleBox">
                    스터디가 종료되어 하단의 스터디 종료 버튼을 누르면<br/> 상단의 스터디원 프로필을 통해 열정 평가가 진행됩니다.<br/>
                    <div className="scheduleAdjustBtn">스터디 종료하기</div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default OngoingStudyDetail
