/*스터디 신청서 목록(제출 x)*/
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import Navbar from '../Navbar/Navbar';
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
            pathname: "/reg_other_app",
            state: {userInfo: userInfo}
        });
    }

    return (
        <div>
            <Navbar userInfo={userInfo}/>
                <div className="appListContainer">
                    <p className="appListTitle">스터디 신청서 등록</p>
                    {
                        apps[0] != 0
                        ? apps.map((a,i)=>{
                            return <AppList apps = {apps[i]} i = {i} userInfo={userInfo}/>
                        })
                        : "지원서가 없습니다"
                    }

                    <button onClick={writeNewAppBtnClick}>새로운 신청서 작성하기</button>
                    
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
