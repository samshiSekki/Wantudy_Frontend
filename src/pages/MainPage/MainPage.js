import React, {useState} from 'react';
import { isDOMComponent } from 'react-dom/test-utils';
import Navbar from '../Navbar/Navbar.js';
import { useHistory } from 'react-router';
import '../../css/mainpage.css';
import Footer from '../Footer/Footer.js';

function MainPage(props) {
    let history = useHistory();
    const [userInfo, setUserInfo] = useState({
        email:'',
        profileImage:'',
        accessToken:'',
        nickname:'',
        userId:'',
        state: '',
        temperature: ''
    })
    function btnClickHandler(){
        history.push('/login');
    }
    return (
        <>
            <Navbar userInfo={userInfo}/>
            <div className="mainPageContainer">
                <div className="container1">
                    <div className="catch">
                        <p>π<br/>
                        ννμ΄μ§λ‘ μμ±λλ<br/>
                        μ€ν°λ λ§€μΉ­, μν°λ.<br/>
                        κ°μ€νκ³ , μ μ²­νκ³ , κ΄λ¦¬νμ!</p>
                        
                        <div className="catchSub">
                            <p>μν°λκ° κΆκΈνμ κ°μ? μ§κΈ λ°λ‘ μμν΄λ³΄μΈμ!</p>
                        </div>

                        <div className="startBtn" onClick={btnClickHandler}>μ§κΈ λ°λ‘ μμνκΈ°</div>
                    </div>

                    <div className="illust">
                        <img src="img/Group 166.png"></img>
                    </div>
                </div>

                <div className="container2">
                    <div className="processContainer">
                        <div className="process openProcess">
                            <img src="img/img.png" className="openIcon"></img>
                            <br/><div className="processSub">κ°μ€νκ³ </div>
                        </div>
                        <div className="process applyProcess">
                            <img src="img/test.png" className="applyIcon"></img>
                            <br/><div className="processSub">μ μ²­νκ³ </div>
                         </div>
                        <div className="process manageProcess">
                            <img src="img/img_manage.png" className="manageIcon"></img>
                            <br/><div className="processSub">κ΄λ¦¬νκ³ </div>
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
                            μνλ μ€ν°λκ° μμΌμ κ°μ?<br/>
                            μνλ μ€ν°λλ₯Ό μ§μ  κ°μ€νμ¬<br/>
                            ν¨κ» ν  μ€ν°λμμ μ°Ύμλ³΄μΈμ!
                            </div>
                            <div className="discSub openDiscSub">
                            λΉμ μ΄ μνλ μ€ν°λλ₯Ό μ§μ  κ°μ€ν΄λ³΄μΈμ.<br/>
                            μν°λμμλΌλ©΄ μ΄μ ZERO μ€ν°λμ κ±±μ ZERO!<br/>
                            λ±λ‘λ μ μ²­μλ₯Ό ν΅ν΄ μ΄μ  κ°λ μ€ν°λμλ€κ³Ό ν¨κ»ν  μ μμ΅λλ€!<br/>
                            </div>
                            <div className="btn2" onClick={btnClickHandler}>
                                μ€ν°λ κ°μ€νκΈ°
                            </div>
                        </div>
                    </div>

                    <div className="applyContainer">
                        <div className="applyDisc">
                            <div className="disc">
                            μ€ν°λλ₯Ό νκ³  μΆμ λΉμ ..<br/>
                            νμ§λ§ μνλ μ€ν°λλ₯Ό μ°ΎκΈ° μ΄λ ΅λ€λ©΄?<br/>
                            μν°λλ‘ μ½κ² μ°Ύμλ³΄κ³  μ μ²­νμΈμ!
                            </div>
                            <div className="discSub applyDiscSub">
                            λ΄κ° μνλ μ€ν°λλ₯Ό ν κ³³μμ ν λ²μ!<br/>
                            μ°κ³  λ μ°λ μ§μμ, μν°λμμλ μμ μ μλ μΌ<br/>
                            μΉ λ΄ λ±λ‘ν μ μ²­μλ₯Ό ν΄λ¦­ ν λ²λ§μΌλ‘ μ μΆνμΈμ!<br/>
                            μν΄λ¦­ μ€ν°λ μ μ²­μ κ²½νν΄λ³΄μΈμ.<br/><br/>
                            </div>
                            <div className="btn3" onClick={btnClickHandler}>
                                μ€ν°λ μ μ²­νκΈ°
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
                            All-In-One μ€ν°λ νλ«νΌ μν°λ,<br/>
                            μ€ν°λμ κ΄λ ¨λ λͺ¨λ  κ²μ<br/>
                            λΉμ μ μ€ν°λλΉμ μν°λμ ν¨κ» κ΄λ¦¬νμΈμ!
                            </div>
                            <div className="startDiscSub">
                            μ€ν°λ κ³Όμ  κΉλ¨Ήμ μΌ ZERO!<br/>
                            μ€ν°λμλ§ μ§μ€ν  μ μλλ‘ λΉμ μ μ€ν°λλΉμκ° λμ΄λλ¦΄κ²μ.<br/>
                            μ μ²­μ, μΌμ , κ³Όμ  λ±μ μ€ν°λμ κ΄λ ¨λ λͺ¨λ  κ΄λ¦¬λ₯Ό<br/>
                            μν°λ ν κ³³μμ κ΄λ¦¬νμΈμ!<br/>
                            </div>
                            <div className="btn2" onClick={btnClickHandler}>
                                μν°λ μμνκΈ°
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

export default MainPage
