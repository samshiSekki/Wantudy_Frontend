import React, {useState, useEffect} from 'react';
import { isDOMComponent } from 'react-dom/test-utils';
import Navbar from '../Navbar/Navbar.js';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';
import '../../css/mainpage.css';
import Footer from '../Footer/Footer.js';

function MainPageLogged(props) {
    let history = useHistory();
    let location = useLocation();
    const userInfo = location.state.userInfo;

    function btnClickHandler(){
        history.push('/login');
    }

    return (
        <>
            <Navbar userInfo={userInfo}/>
            <div className="mainPageContainer">
                <div className="container1">
                    <div className="catch">
                            <p>👋<br/>
                            한페이지로 완성되는<br/>
                            스터디 매칭, 원터디.<br/>
                            개설하고, 신청하고, 관리하자!</p>
                            <div className="catchSub">
                                <p>원터디가 궁금하신가요? 지금 바로 시작해보세요!</p>
                            </div>

                            <div className="startBtn" onClick={btnClickHandler}>지금 바로 시작하기</div>
                    </div>

                    <div className="illust">
                        <img src="img/Group 166.png"></img>
                    </div>
                </div>

                <div className="container2">
                    <div className="processContainer">
                        <div className="process openProcess">
                            <img src="img/img.png" className="openIcon"></img>
                            <br/><div className="processSub">개설하고</div>
                        </div>
                        <div className="process applyProcess">
                            <img src="img/test.png" className="applyIcon"></img>
                            <br/><div className="processSub">신청하고</div>
                         </div>
                        <div className="process manageProcess">
                            <img src="img/img_manage.png" className="manageIcon"></img>
                            <br/><div className="processSub">관리하고</div>
                        </div>
                    </div>

                    <div className="openContainer">
                        <div className="openIllust">
                            <img src="img/Group 168.png" className="OI1"></img>
                            <img src="img/icon11.png" className="OI2"></img>
                            <div className="openEllipse"></div>
                        </div>
                        <div className="openDisc">
                            <div className="disc">
                            원하는 스터디가 없으신가요?<br/>
                            원하는 스터디를 직접 개설하여<br/>
                            함께 할 스터디원을 찾아보세요!
                            </div>
                            <div className="discSub openDiscSub">
                            당신이 원하는 스터디를 직접 개설해보세요.<br/>
                            원터디에서라면 열정ZERO 스터디원 걱정ZERO!<br/>
                            등록된 신청서를 통해 열정 가득 스터디원들과 함께할 수 있습니다!<br/>
                            </div>
                            <div className="btn2" onClick={btnClickHandler}>
                                스터디 개설하기
                            </div>
                        </div>
                    </div>

                    <div className="applyContainer">
                        <div className="applyDisc">
                            <div className="disc">
                            스터디를 하고 싶은 당신..<br/>
                            하지만 원하는 스터디를 찾기 어렵다면?<br/>
                            원터디로 쉽게 찾아보고 신청하세요!
                            </div>
                            <div className="discSub applyDiscSub">
                            내가 원하는 스터디를 한 곳에서 한 번에!<br/>
                            쓰고 또 쓰는 지원서, 원터디에서는 있을 수 없는 일<br/>
                            웹 내 등록한 신청서를 클릭 한 번만으로 제출하세요!<br/>
                            원클릭 스터디 신청을 경험해보세요.<br/><br/>
                            </div>
                            <div className="btn3" onClick={btnClickHandler}>
                                스터디 신청하기
                            </div>
                        </div>

                        <div className="applyIllust">
                            <div className="applyEllipse"></div>
                            <img src="img/Group 169.png"></img>
                        </div>
                    </div>

                    <div className="startContainer">
                        <div className="startIllust">
                            <div className="startEllipse"></div>
                            <img src="img/Group 171.png"></img>
                        </div>
                        <div className="startDisc">
                            <div className="disc2">
                            All-In-One 스터디 플랫폼 원터디,<br/>
                            스터디와 관련된 모든 것은<br/>
                            당신의 스터디비서 원터디와 함께 관리하세요!
                            </div>
                            <div className="startDiscSub">
                            스터디 과제 까먹을 일 ZERO!<br/>
                            스터디에만 집중할 수 있도록 당신의 스터디비서가 되어드릴게요.<br/>
                            신청서, 일정, 과제 등의 스터디와 관련된 모든 관리를<br/>
                            원터디 한 곳에서 관리하세요!<br/>
                            </div>
                            <div className="btn2" onClick={btnClickHandler}>
                                원터디 시작하기
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Footer">
                <Footer/>
                </div>
            </div>
        </>
    )
}

export default MainPageLogged
