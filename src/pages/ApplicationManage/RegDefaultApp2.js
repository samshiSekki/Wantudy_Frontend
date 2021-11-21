import React, {useState} from 'react'
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import '../../css/regDefaultApp.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import NavbarWhite from '../Navbar/NavbarWhite';

function RegDefaultApp2(props) {
    let history = useHistory();
    let location = useLocation();
    const userInfo = location.state.userInfo;
    const appContents = location.state.appContents;
    const [selected, setSelected] = useState([false, false, false, false, false, false, false, false]);
    const [selectedKeyword, setSelectedKeyword] = useState([false, false, false, false, false, false]);
    let interests = ["데이터 분석", "기획", "마케팅", "개발/프로그래밍", "취업", "어학", "인공지능", "디자인"];
    let keywords = ["철두철미한", "적극적인", "시간 약속을 잘 지키는", "친절한", "성실한", "책임감이 강한"];

    let resultInterests = [];
    let reslutKeywords = [];

    console.log(appContents);

    function interestClickListener(i){
        let newArray = [...selected];
        newArray[i] = !newArray[i];
        setSelected(newArray);
    }

    function keywordClickListener(i){
        let newArray = [...selectedKeyword];
        newArray[i] = !newArray[i];
        setSelectedKeyword(newArray);
    }

    const submitClickHandler = async() => {

        for(let i=0; i<8; i++){
            if(selected[i] == true){
                resultInterests.push(interests[i]);
            }
        }

        for(let i=0; i<8; i++){
            if(selectedKeyword[i] == true){
                reslutKeywords.push(keywords[i]);
            }
        }

        let response = await axios.post(`http://13.209.66.117:8080/study/application`,{
            userId: userInfo.userId,
            applicationName: appContents.appName,
            name: appContents.name,
            gender: appContents.gender,
            age: parseInt(appContents.age),
            school: appContents.school,
            major: appContents.major,
            attending: appContents.attending,
            semester: [1],
            address: appContents.address,
            interests: resultInterests,
            keyword: reslutKeywords,
            specification: appContents.record
        });

        userInfo.state = true;

        history.push({ 
            pathname: "/mod_app_lists",
            state: {userInfo: userInfo}
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

            <div className="rda2Container">
                <div className="rdaContents">
                    <p className="appTitle">스터디 신청서</p>
                    <hr className="appHr"/>

                    <div className="rdaItemContainer2">
                        <div className="appText2">
                            <img src="img/Group 293.png"/>
                        </div>
                        <div className="rda2BtnContainer">
                        <div className={selected[0] == false?"rda2Btn":"rda2BtnSelected"} onClick={()=>(interestClickListener(0))}>
                            데이터 분석
                        </div>
                        <div className={selected[1] == false?"rda2Btn":"rda2BtnSelected"} onClick={()=>(interestClickListener(1))}>
                            기획
                        </div>
                        <div className={selected[2] == false?"rda2Btn":"rda2BtnSelected"} onClick={()=>(interestClickListener(2))}>
                            마케팅
                        </div>
                        <div className={selected[3] == false?"rda2Btn2":"rda2Btn2Selected"} onClick={()=>(interestClickListener(3))}>
                            개발/프로그래밍
                        </div>
                        <div className={selected[4] == false?"rda2Btn3":"rda2Btn3Selected"} onClick={()=>(interestClickListener(4))}>
                            취업
                        </div>
                        <div className={selected[5] == false?"rda2Btn3":"rda2Btn3Selected"} onClick={()=>(interestClickListener(5))}>
                            어학
                        </div>
                        <div className={selected[6] == false?"rda2Btn3":"rda2Btn3Selected"} onClick={()=>(interestClickListener(6))}>
                            인공지능
                        </div>
                        <div className={selected[7] == false?"rda2Btn3":"rda2Btn3Selected"} onClick={()=>(interestClickListener(7))}>
                            디자인
                        </div>
                        </div>
                    </div>
                    <hr className="appHr"/>
                    <div className="rdaItemContainer2">
                        <div className="appText2">
                            <img src="img/Group 299.png"/>
                        </div>
                        <div className="rda2BtnContainer2">
                        <div className={selectedKeyword[0] == false?"rda2Btn":"rda2BtnSelected"} onClick={()=>(keywordClickListener(0))}>
                            철두철미한
                        </div>
                        <div className={selectedKeyword[1] == false?"rda2Btn":"rda2BtnSelected"} onClick={()=>(keywordClickListener(1))}>
                            적극적인
                        </div>
                        <div className={selectedKeyword[2] == false?"rda2Btn4":"rda2Btn4Selected"} onClick={()=>(keywordClickListener(2))}>
                            시간 약속을 잘 지키는
                        </div>
                        <div className={selectedKeyword[3] == false?"rda2Btn3":"rda2Btn3Selected"} onClick={()=>(keywordClickListener(3))}>
                            친절한
                        </div>
                        <div className={selectedKeyword[4] == false?"rda2Btn3":"rda2Btn3Selected"} onClick={()=>(keywordClickListener(4))}>
                            성실한
                        </div>
                        <div className={selectedKeyword[5] == false?"rda2Btn5":"rda2Btn5Selected"} onClick={()=>(keywordClickListener(5))}>
                            책임감이 강한
                        </div>

                        </div>
                    </div>
                    <hr className="appHr"/>

                    <div className="rdaSubmitBtn" onClick={submitClickHandler}>
                        <img src="img/Group 154.png"/>
                    </div>
                    <div className="rdaPrevBtn" onClick={()=>(history.goBack())}>
                        <img src="img/Group 186.png"/>
                    </div>
                </div>
            </div>

            </div>

            <Footer/>
        </>
    )
}

export default RegDefaultApp2
