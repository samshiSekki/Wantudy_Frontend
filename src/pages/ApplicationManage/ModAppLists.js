/*스터디 신청서 목록(제출 x)*/
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/modAppLists.css';

function ModAppLists(props) {
    const location = useLocation();
    const userInfo = location.state.userInfo;
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
    }

    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
                <div className="modAppListBanner">
                    <div className="rdbContent1">

                    <div className="rdbDisc">
                        안녕하세요, {userInfo.nickname}님👋<br/>
                        스터디 신청을 위한<br/>
                        신청서를 등록해주세요.
                    </div>

                    </div>
                    <div className="malIllust">
                        <img src="img/Group 347.png"/>
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
                            <img src="img/Group 392.png"/>
                            </div>
                        </div>
                        {
                            apps.map((a,i)=>{
                                return <AppList apps = {apps[i]} i = {i} userInfo={userInfo}/>
                            })
                        }
                    </div>
                    
                    
                    
                </div>

            <Footer/>
        </div>
    )
}

function AppList(props){
    const [modal, setModal] = useState(false);
    let history = useHistory();

    function modifyBtnClickListner(){
        history.push({ 
            pathname: "/mod_default_app",
            state: {userInfo: props.userInfo, apps: props.apps}
        });
    }


    const deleteBtnClickListner = async() => {
        await axios.delete(`http://13.209.66.117:8080/study/application/${props.apps.applicationId}`);
        alert('지원서가 삭제되었습니다!');
        window.location.reload();
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

            <div className={props.i % 3 == 2?"myAppRight":"myApp"} onClick={modifyBtnClickListner}>
                <div className="myAppTitle">
                🔗
                {props.i==0
                    ? `기본신청서 : ${props.apps.applicationName}` 
                    : `신청서 ${props.i} : ${props.apps.applicationName}`
                }
                <div className="malBtnContainer">
                {props.i==0
                    ?null
                    :<div onClick={deleteBtnClickListner} className="malBtn">삭제</div>
                }
                <div onClick={modifyBtnClickListner} className="malBtn">수정</div>
                
                </div>
                </div>
            </div>
        </div>
    )
}

function Modal(props){

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
