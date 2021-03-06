import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';
import Modal from '../PassionPage/Modal.js';
import Modal2 from './Modal2';
import {Input,List,message} from 'antd';
import {assignmentSave,assignmentCheckSave} from '../../components/functions/postFunctions'
import { mixedTypeAnnotation } from '@babel/types';

function OngoingStudyDetail() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    const ongoingStudy = location.state.ongoingStudy;

    const isManager = location.state.isManager;
    const history = useHistory();
    const [assign, setAssign] = useState(ongoingStudy.todoAssignment);
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpen2, setModalOpen2] = useState(false)
    const [checkBox, setCheckBox] = useState(false);
    const modalClose = () => {
        setModalOpen(!modalOpen)

    }
    const [userId, setUserId] = useState(userInfo.userId);
    const [memberId, setMemberId] = useState(ongoingStudy.participants[0].userId);
    const [value, setvalue] = useState({ assignmentName:'',assignment:'',deadline:''});

    const [common, setCommon] = useState([]);
    const [numberr,setNumberr]= useState(0);
    for (var f = 0; f < assign.length; f++) {
        assign[f].assignment.newId = f;
        

      } 
    useEffect(() => {
        setCheckBox(JSON.parse(window.localStorage.getItem('checkBox')));
      }, []);
    
      useEffect(() => {
        window.localStorage.setItem('checkBox', checkBox);
      }, [checkBox]);

    useEffect(async()=>{
        let response = await axios.get(`http://13.209.66.117:8080/studyList/${ongoingStudy.studyInfo.StudyId}`);
     
        setCommon(response.data.data.commonSchedule);
      

    },[]);


    function scheduleBtnClickHandler(){
        history.push({ 
            pathname: "/schedule",
            state: {userInfo: userInfo, isManager: isManager, ongoingStudy: ongoingStudy}
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
            message.success('?????? ??????');
            
            
          })
          .catch((error) => {
              
          });
          history.goBack();

    }

    function onAssignmentCheck (assignmentId){
        assignmentCheckSave(userId,ongoingStudy.studyInfo.StudyId,assignmentId)
        .then(() => {
            setCheckBox(true);
          message.success('?????? ??????!');
          
          
        })
        .catch((error) => {
           
        });
       
        setNumberr(numberr+1);



    }

    const modalClose2 = () => {
        setModalOpen2(!modalOpen2);

    }

    const checkCheck = (item) =>{
       
       

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
                    {
                        common[0] == null
                        ? 
                        <div className="ongoingDetailContainers">
                        <div className="ongoingSubTitle">???? ????????? ??????</div>

                        <div className="scheduleBox">
                        ????????? ????????? ?????? ???????????? ???????????????.<br/>?????? ????????? ?????? ??????????????? ????????? ???????????? ??????????????????.<br/>
                        <div className="scheduleAdjustBtn" onClick={scheduleBtnClickHandler}>?????? ????????????</div>
                        </div>

                        </div>
                        
                        : 
                        <div className="ongoingDetailContainers">
                        <div className="ongoingSubTitle">???? ????????? ??????</div>

                        <div className="scheduleBox2">
                        {`?????? ${common[0][0]}?????? ${common[0][1]}??? - ${parseInt(common[0][common[0].length-1])+1}???`}
                        <div className="checkScheduleBtn" onClick={scheduleBtnClickHandler}>?????? ??????</div>
                        </div>

                        </div>
                    }

                <div className="ongoingDetailContainers">
                    <div className="ongoingSubTitle">??? ????????? ??????</div>

                    <div /* className="subjectTodoBox1" */>
                   <List className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={assign}
        renderItem={item =>
           (
            <List.Item
            >
             
                <List.Item.Meta
                  // eslint-disable-next-line jsx-a11y/alt-text
                  className="study-assignment-list"
                  title={ <div><input style={{float:'left',marginRight:'10px',marginTop:'5px'}} type="checkbox" id = {item.assignment.newId} onClick={()=>
                    {onAssignmentCheck(item.assignment.assignmentId)
                        /* const index=assign.indexof(item); */
                        /* if (document.getElementById(item.assignment.newId).checked === true) {
                            number[item.assignment.newId] = 1;
                        }
                        else{
                            number[item.assignment.newId] = 0;
                        } */
                    }}></input><label><div style={{float:'left'}}>{item.assignment.assignmentName}</div></label></div>}
                  description={<><div style={{float:'left',marginLeft:'500px'}}>{/* {item.assignment.currentNum} */}{numberr}/{ongoingStudy.participants.length}??? ??????</div><div>{item.assignment.deadline.substring(0,4)}??? {item.assignment.deadline.substring(5,7)}??? {item.assignment.deadline.substring(8,10)}??? ?????? 11??? 59??? ??????</div>
                  
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
                        <div className="ongoingSubTitle">???? ????????? ??????</div>
                        

                        <div className="subjectTodoBox2">
                            <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={assign}
        renderItem={item =>
         (
            <List.Item
            >
             
                <List.Item.Meta
                  // eslint-disable-next-line jsx-a11y/alt-text
                  className="study-assignment-list"
                  title={ <div style={{float:'left'}}>{item.assignment.assignmentName}</div>}
                  description={<><div style={{float:'left',marginLeft:'400px'}}>{/* {item.assignment.currentNum} */}{numberr}/{ongoingStudy.participants.length}??? ??????</div><div style={{float:'left',marginLeft:'40px'}}>{item.assignment.deadline.substring(0,4)}??? {item.assignment.deadline.substring(5,7)}??? {item.assignment.deadline.substring(8,10)}??? ?????? 11??? 59??? ??????</div>
                  <button onClick={modalClose2} style={{borderRadius:'40.5px',backgroundColor:'#497EF1',border:'none',color:'white',width:'74.73px',height:'40px',marginTop:'-13px'}}>??????</button>
                  {modalOpen2 && <Modal2 modalClose={modalClose2} userId={userId} studyId={ongoingStudy.studyInfo.StudyId} assignmentId={item.assignment.assignmentId}></Modal2>}
                  </>}
              
              />
              
             
             
            </List.Item>
          )
        }
      />
                        <div className="inputBox">
                        <Input
          className="study-assignmentName-bar"
          placeholder="?????? ?????? ???????????????"
          type="text"
          value={value.assignmentName}
          onChange={(e) => {
            setvalue({ ...value, assignmentName: e.target.value });
          }}
        />
           <Input
          className="study-assignment-bar"
          placeholder="?????? ????????? ???????????????"
          type="text"
          value={value.deadline}
          onChange={(e) => {
            setvalue({ ...value, deadline: e.target.value });
          }}
        />
           <Input
          className="study-deadline-bar"
          placeholder="?????? ?????? ?????? ????????? ??????????????? (??????)"
          type="text"
          value={value.assignment}
          onChange={(e) => {
            setvalue({ ...value, assignment: e.target.value });
          }}
        />
        <button className="assignment-regist-button" onClick={onRegisterClick}>??????</button>
                        </div>
                    
                        </div>
                        </div>
                    )
                    : null
                }

                <div className="ongoingDetailContainers">
                    <div className="ongoingSubTitle">???? ?????? ?????? ??????</div>

                    <div className="scheduleBox">
                    ???????????? ???????????? ????????? ????????? ?????? ????????? ?????????<br/> ????????? ???????????? ???????????? ?????? ?????? ????????? ???????????????.<br/>
                    <div className="scheduleAdjustBtn" onClick={modalClose}>????????? ????????????</div>
                    {modalOpen && <Modal modalClose={modalClose} history={history} userId={userId} memberId={memberId} ongoingStudy={ongoingStudy}></Modal>}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

function showStudySchedule(props){

    let commonText ='';

    function showSchedule(){
        for(let i=0; i<props.common.length; i++){
            commonText = commonText + `?????? ${props.common[i][0]} ${props.common[i][1]} - ${parseInt(props.common[i][props.common[i].length-1])+1}\n`
        }
        return commonText
    }
    
    return(
        <>
            <div className="ongoingDetailContainers">
                <div className="ongoingSubTitle">???? ????????? ??????</div>

                    <div className="scheduleBox2">
                        {showSchedule}
                    </div>

            </div>
        </>
    )
}

export default OngoingStudyDetail
