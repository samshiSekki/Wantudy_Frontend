/*스터디 신청서 목록(제출 o)*/
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import { Card, message, Popconfirm,Alert,Modal,Button,Radio,Tag,Input} from 'antd';
import NavbarWhite from '../../pages/Navbar/NavbarWhite';
import Footer from '../../pages/Footer/Footer';
import '../../css/modAppLists.css'
import useErrorHandling from '../../hooks/useErrorHandling';
import {registerPost
  } from '../functions/postFunctions'
import img1 from './Group347.png'
import img2 from './Group392.png'

function ModAppLists(props) {

    const userInfo = props.location.state.userInfo;
    const studyId = props.location.state.id;
    const [apps, setApps] = useState([0,]);
    let history = useHistory();
   

    useEffect(async()=>{
        const response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/application`);
        console.log(response);
        setApps(response.data);
    },[]);
    
    if(apps[0] != 0){
    console.log(apps);
    }

    function writeNewAppBtnClick(){
        history.push({ 
            pathname: "/reg_default_app",
            state: {userInfo: userInfo}
        });
        window.location.reload();
    }

    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
                <div className="modAppListBanner">
                    <div className="rdbContent1">

                    <div className="rdbDisc">
                        <span stlyle={{color:'#497EF1'}}>[{props.location.state.posts.userId}]</span>님이 개설한 스터디에<br/>
                        신청할 신청서를 선택해 신청하세요.
                    </div>

                    </div>
                    <div className="malIllust">
                        <img src={img1}/>
                    </div>
                </div>
                <div className="appListContainer">

                    <div className="malNotify">
                        <ul>
                            <li>대표 신청서를 등록 후 추가적인 신청서를 등록할 수 있습니다.</li>
                            <li>스터디 신청 후 신청서를 수정해도 이전에 신청한 스터디의 신청서에는 반영되지 않습니다.</li>
                        </ul>
                    </div>

                    <div className="myAppContainer">
                        <div className="myApp" onClick={writeNewAppBtnClick}>
                            <div className="newAppImg">
                            <img src={img2}/>
                            </div>
                        </div>
                        {
                            apps.map((a,i)=>{
                                return <AppList studyId = {studyId} apps = {apps[i]} i = {i} userInfo={userInfo} posts = {props.location.state.posts}/>
                            })
                        }
                    </div>
                    
                    
                    
                </div>

            <Footer/>
        </div>
    )
}

function AppList(props){
    
  const errorHandling = useErrorHandling();
    const [modal, setModal] = useState(false);
    let history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectList, setSelectList] = useState([]);
  const [isButtonVisible, setIstButtonVisible] = useState(true);

  const [isListVisible, setIsListVisible] = useState(false);
  const [isListVisible2, setIsListVisible2] = useState(false);
  const [value,setValue] = useState({message:null});

    function modifyBtnClickListner(){
        history.push({ 
            pathname: "/mod_default_app",
            state: {userInfo: props.userInfo, apps: props.apps}
        });
    }
    
    const showModal = () =>{
        setIsModalVisible(true);
    }
    
  const handleCancel = () => {
    setIsModalVisible(false);
    setIstButtonVisible(false)
    setIsListVisible2(false)
    history.goBack();
  };

  const onRegister=()=>{
    setIstButtonVisible(false);
    setIsListVisible(!isListVisible);

  }


    const deleteBtnClickListner = async() => {
        await axios.delete(`http://13.209.66.117:8080/study/application/${props.apps.applicationId}`);
        alert('지원서가 삭제되었습니다!');
        window.location.reload();
    }
    const handleRegister=()=>{
        console.log(props.userInfo.userId,
            props.apps.applicationId)
        
      let body = {
        "userId": props.userInfo.userId,
  "applicationId": props.apps.applicationId,
  "message":value.message
      }
      console.log(body)
        registerPost(props.studyId, body)
        .then(() => {
            setIsListVisible(false);
            setIsListVisible2(true);
        })
        .catch((error) => {
          errorHandling(error.response?.data.message);
        });
      }

    return(
        <div>
            {/*
            <div className="apps" onClick={()=>{setModal(!modal)}}>
            {props.i==0
                ? `기본신청서 : ${props.apps.applicationId}` 
                : `신청서 ${props.i} : ${props.apps.applicationId}`
            }
            <button onClick={modifyBtnClickListner}>수정</button>
            {props.i==0
                ?null
                :<button onClick={deleteBtnClickListner}>삭제</button>
            }
            </div>
            {modal === true
            ?<Modal apps = {props.apps}/>
            :null
            }
            */}

            <div className={props.i % 3 == 2?"myAppRight":"myApp"} onClick={showModal}>
                <div className="myAppTitle">
                🔗
                {props.i==0
                    ? `대표 신청서 : ${props.apps.applicationName}` 
                    : `신청서 ${props.i} : ${props.apps.applicationName}`
                }
                <div className="malBtnContainer">
                <div onClick={showModal} style={{backgroundColor:'#497EF1',color:'white'}} className="malBtn">신청</div>
                <Modal visible={isModalVisible} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }}>
        {isButtonVisible?( <><div style={{marginLeft:'80pt',marginTop:'30pt', marginBottom:'30pt'}}> [{props.i==0
                    ? `대표 신청서 : ${props.apps.applicationId}` 
                    : `신청서 ${props.i} : ${props.apps.applicationId}`
                }]를 [{props.posts.userId}]님이 개설한<br/>
        [{props.posts.studyName}] 스터디에<br/>
        신청하시겠습니까?</div><button className="malBtn" style={{marginRight:'130pt',marginTop:'-20pt',border:'none'}}onClick={onRegister}>신청</button><button className="malBtn" style={{marginTop:'-20pt',border:'none'}}stonClick={handleCancel}>취소</button></>):
        <div>{isListVisible ? (<><div style={{marginLeft:'80pt',marginTop:'50pt', marginBottom:'30pt'}}>스터디에 임할 포부 등 스터디장에게<br/>
            전달할 메시지를 작성해보세요.</div> <Input style={{marginBottom:'30pt',borderRadius:'30pt',height:'80pt'}}type="text"
          placeholder="ex. 성실한 태도로 스터디에 임하겠습니다." value={value.message}
          onChange={(e) => {console.log(value.message)
            setValue({ ...value, message: e.target.value });
          }}></Input><button className="malBtn" style={{marginRight:'160pt',marginTop:'-15pt',border:'none',backgroundColor:'#497EF1',color:'white'}} onClick={handleRegister}>신청</button></>):
          <div>
          {isListVisible2 ? (<><div style={{marginLeft:'50pt',marginTop:'50pt', marginBottom:'30pt'}}>신청했습니다!<br/>
           수락 여부는 마이페이지를 통해 확인해주시길 바랍니다.</div><button  className="malBtn" style={{marginRight:'160pt',marginTop:'-15pt',border:'none',backgroundColor:'#497EF1',color:'white'}} onClick={handleCancel}>확인</button></>):<>
           이미 신청한 스터디입니다.<button className="malBtn" style={{marginRight:'160pt',marginTop:'-15pt',border:'none',backgroundColor:'#497EF1',color:'white'}} stonClick={handleCancel}>확인</button></>}
        </div>}</div>}
      </Modal>
                
                <div onClick={modifyBtnClickListner} className="malBtn">수정</div>
                
                </div>
                </div>
            </div>
        </div>
    )
}

function ModalList(props){

    return(
        <div>
            <div className="modalContainer">
                {`이름 : ${props.apps.name}`} <br/>
                {`나이 : ${props.apps.age}`} <br/>
                {`학교 : ${props.apps.school}`} <br/>
            </div>
        </div>
    )
}

export default ModAppLists
