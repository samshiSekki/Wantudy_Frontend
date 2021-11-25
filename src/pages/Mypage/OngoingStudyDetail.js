import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';
import Modal from '../PassionPage/Modal.js';
import {Input,List,message} from 'antd';
import {assignmentSave} from '../../components/functions/postFunctions'

function OngoingStudyDetail() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    const ongoingStudy = location.state.ongoingStudy;
    const isManager = location.state.isManager;
    const history = useHistory();
    const [assign, setAssign] = useState(ongoingStudy.todoAssignment);
    const [modalOpen, setModalOpen] = useState(false)
    const modalClose = () => {
        setModalOpen(!modalOpen)

    }
    const [userId, setUserId] = useState(userInfo.userId);
    const [memberId, setMemberId] = useState(ongoingStudy.participants[0].userId);
    const [value, setvalue] = useState({ assignmentName:'',assignment:'',deadline:''});
    
    console.log(ongoingStudy);
    console.log(isManager);

    function scheduleBtnClickHandler(){
        history.push({ 
            pathname: "/schedule",
            state: {userInfo: userInfo, studyInfo: ongoingStudy.studyInfo, isManager: isManager, participants: ongoingStudy.participants}
          });
    }
/*     const getUserId = () =>{
        ongoingStudy.participants.map((a,i)=>{
            if(ongoingStudy.participants[i].userId != ongoingStudy.studyInfo.userId){
                setMemberId(ongoingStudy.studyInfo.userId)
            }
            else{
                setUserId(ongoingStudy.studyInfo.userId);
            }
        })
    } */
    function onRegisterClick (e){
        e.preventDefault();

        let body = {
            assignmentName:value.assignmentName,
            assignment:value.assignment,
            deadline:value.deadline
          
        };
        assignmentSave(userId,ongoingStudy.studyInfo.StudyId,body)
          .then(() => {
            message.success('작성 완료');
            
            
          })
          .catch((error) => {
              console.log(error)
          });
          window.location.reload();

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

                    <div /* className="subjectTodoBox1" */>
                   <List className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={assign}
        renderItem={item =>
          console.log(item) || (
            <List.Item
            >
             
                <List.Item.Meta
                  // eslint-disable-next-line jsx-a11y/alt-text
                  className="study-assignment-list"
                  title={ <div><input style={{float:'left',marginRight:'10px',marginTop:'5px'}} type="checkbox"></input><label><div style={{float:'left'}}>{item.assignment.assignmentName}</div></label></div>}
                  description={<><div style={{float:'left',marginLeft:'500px'}}>{item.assignment.currentNum}/{ongoingStudy.participants.length}명 완료</div><div>{item.assignment.deadline}</div>
                  
              </>}
              
              />
              
             
             
            </List.Item>
          )
        }
      />
                        
                    
                    </div>
                </div>
                {
                    isManager == 1
                    ? (
                        <div className="ongoingDetailContainers">
                        <div className="ongoingSubTitle">📂 관리할 과제</div>
                        

                        <div className="subjectTodoBox2">
                            <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={assign}
        renderItem={item =>
          console.log(item) || (
            <List.Item
            >
             
                <List.Item.Meta
                  // eslint-disable-next-line jsx-a11y/alt-text
                  className="study-assignment-list"
                  title={ <div style={{float:'left'}}>{item.assignment.assignmentName}</div>}
                  description={<><div style={{float:'left',marginLeft:'500px'}}>{item.assignment.currentNum}/{ongoingStudy.participants.length}명 완료</div><div>{item.assignment.deadline}</div>
                  
                  </>}
              
              />
              
             
             
            </List.Item>
          )
        }
      />
                        <div className="inputBox">
                        <Input
          className="study-assignmentName-bar"
          placeholder="과제 명을 입력하세요"
          type="text"
          value={value.assignmentName}
          onChange={(e) => {console.log(value)
            setvalue({ ...value, assignmentName: e.target.value });
          }}
        />
           <Input
          className="study-assignment-bar"
          placeholder="마감 일자를 입력하세요"
          type="text"
          value={value.deadline}
          onChange={(e) => {console.log(value)
            setvalue({ ...value, deadline: e.target.value });
          }}
        />
           <Input
          className="study-deadline-bar"
          placeholder="과제 관련 상세 설명을 입력하세요 (선택)"
          type="text"
          value={value.assignment}
          onChange={(e) => {console.log(value)
            setvalue({ ...value, assignment: e.target.value });
          }}
        />
        <button className="assignment-regist-button" onClick={onRegisterClick}>등록</button>
                        </div>
                    
                        </div>
                        </div>
                    )
                    : null
                }

                <div className="ongoingDetailContainers">
                    <div className="ongoingSubTitle">🔥 상호 열정 평가</div>

                    <div className="scheduleBox">
                    스터디가 종료되어 하단의 스터디 종료 버튼을 누르면<br/> 상단의 스터디원 프로필을 통해 열정 평가가 진행됩니다.<br/>
                    <div className="scheduleAdjustBtn" onClick={modalClose}>스터디 종료하기</div>
                    {modalOpen && <Modal modalClose={modalClose} userId={userId} memberId={memberId}></Modal>}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default OngoingStudyDetail
