import React, {useState} from 'react'
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import '../../css/regDefaultApp.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import NavbarWhite from '../Navbar/NavbarWhite';
import RegDefaultApp2 from './RegDefaultApp2';

/*기본 지원서 등록 페이지*/
function RegDefaultApp(props) {

    let location = useLocation();
    const userInfo = location.state.userInfo;

    const [appName, setAppName] = useState("default app"); //신청서명
    const [name, setName] = useState("default name"); //성명
    const [gender, setGender] = useState("남자"); //성별
    const [age, setAge] = useState("default age"); //나이
    const [school, setSchool] = useState("default school"); //학교
    const [major, setMajor] = useState("default major"); //전공
    const [attend, setAttend] = useState("재학"); //재학 여부
    const [address, setAddress] = useState("default address"); //거주지
    const [record, setRecord] = useState(" "); //이력

    function appNameChange(e){
        setAppName(e.target.value);
    }

    function nameChange(e){
        setName(e.target.value);
    }

    function ageChange(e){
        setAge(e.target.value);
    }

    function schoolChange(e){
        setSchool(e.target.value);
    }

    function majorChange(e){
        setMajor(e.target.value);
    }

    function addressChange(e){
        setAddress(e.target.value);
    }

    function recordChange(e){
        setRecord(e.target.value);
    }

    function nextBtnClickHandler(){
        let appContents = {
            appName: appName,
            name: name,
            gender: gender,
            age: age,
            school: school,
            major: major,
            attending: attend,
            address: address,
            record: record
        }
        props.history.push({ 
            pathname: "/reg_default_app2",
            state: {userInfo: userInfo, appContents: appContents}
        });
    }

    
    return (
        <>
            <NavbarWhite userInfo={userInfo}/>
            <div className="registerAppsContainer">
            <div className="regDefaultBanner">
                <div className="rdbContent1">

                    <div className="rdbDisc">
                    안녕하세요, {userInfo.nickname}님👋<br/>
                    스터디 신청을 위한<br/>
                    신청서를 등록해주세요.
                    </div>

                </div>
                <div className="rdbIllust">
                    <img src="img/Other 03.png"/>
                </div>
            </div>
            <div className="rdaContainer">
                <div className="rdaContents">
                <p className="appTitle">스터디 신청서</p>
                <hr className="appHr"/>

                <div className="rdaItemContainer">
                    <p className="nameText">신청서명</p>
                    <input type="text" className="inputSchool" onChange={appNameChange}/><br/>
                </div>
                <hr className="appHr"/>
                
                <div className="rdaItemContainer">
                    <p className="nameText">성명</p>
                    <input type="text" className="inputName" onChange={nameChange}/><br/>
                </div>

                <hr className="appHr"/>

                <div className="rdaItemContainer">
                    <p className="nameText">성별</p>
                    <div className={gender=="여자"? "femaleSelectedButton" : "femaleButton"} onClick={()=>(setGender("여자"))}>여자</div>
                    <div className={gender=="남자"? "maleSelectedButton" : "maleButton"} onClick={()=>(setGender("남자"))}>남자</div>
                </div>

                <hr className="appHr"/>

                <div className="rdaItemContainer">
                    <p className="nameText">나이</p>
                    <input type="text" className="inputAge" onChange={ageChange} placeholder="'만' 나이 기준"/><br/>
                </div>

                <hr className="appHr"/>

                <div className="rdaItemContainer">
                    <p className="nameText">소속</p>
                    <input type="text" className="inputSchool" onChange={schoolChange} placeholder="학교 혹은 회사명"/><br/>
                </div>

                <hr className="appHr"/>

                <div className="rdaItemContainer">
                    <p className="nameText">전공</p>
                    <input type="text" className="inputSchool" onChange={majorChange}/><br/>
                </div>

                <hr className="appHr"/>

                <div className="rdaItemContainer">
                    <p className="nameText">재학 여부</p>
                    <div className={attend=="해당 없음"? "femaleSelectedButton" : "femaleButton"} onClick={()=>(setAttend("해당 없음"))}>해당 없음</div>
                    <div className={attend=="졸업"? "femaleSelectedButton" : "femaleButton"} onClick={()=>(setAttend("졸업"))}>졸업</div>
                    <div className={attend=="휴학"? "femaleSelectedButton" : "femaleButton"} onClick={()=>(setAttend("휴학"))}>휴학</div>
                    <div className={attend=="재학"? "femaleSelectedButton" : "femaleButton"} onClick={()=>(setAttend("재학"))}>재학</div>
                </div>

                <hr className="appHr"/>

                <div className="rdaItemContainer">
                    <p className="nameText">이력</p>
                    <input type="text" className="inputSchool" onChange={recordChange} placeholder="교내활동, 대외활동, 인턴, 동아리, 프로젝트 등"/><br/>
                </div>

                <hr className="appHr"/>

                <div className="rdaItemContainer">
                    <p className="nameText">거주지</p>
                    <input type="text" className="inputSchool" onChange={addressChange} placeholder="'구'단위까지"/><br/>
                </div>

                <hr className="appHr"/>

                
                
                <div className="nextButton" onClick={nextBtnClickHandler}>
                    <img src="img/Group 127.png" className="nextVector"/>
                    다음
                </div>

                </div>
            </div>
            </div>
                <Footer/>
        </>
    )
}

export default withRouter(RegDefaultApp)