import React from 'react'
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';
const {Kakao} = window;

function Login(props) {

    const [isLogin, setIsLogin] = useState(false)
    const [email, setEmail] = useState("default email")
    const [profileImage, setProfileImage] = useState("default profile img")
    const [accessToken, setAccessToken] = useState("default token")
    const [userInfo, setUserInfo] = useState({
        email:'',
        profileImage:'',
        accessToken:'',
        nickname:'',
        userId:'',
        state: '',
        temperature: ''
    })

    function LoginClickHandler(){
        try {
            return new Promise((resolve, reject) => {
                if (!Kakao) {
                    reject('kakao 인스턴트 없음');
                }
                Kakao.Auth.login({
                    success: (auth) => {
                        console.log('로그인 성공', auth);
                        const authData = auth;

                        /* 동일한 토큰이 오는지 확인 
                        if(Kakao.Auth.getAccessToken){
                            console.log(Kakao.Auth.getAccessToken());
                        }                        
                        */
                       
                        setIsLogin(true);
                        window.Kakao.API.request({
                            url:'/v2/user/me',
                            success: res =>{
                                const kakao_account = res.kakao_account;

                                const email = kakao_account.email;
                                const profileImage = kakao_account.profile.profile_image_url;
                                const accessToken = authData.access_token;

                                sendKakao(email, profileImage, accessToken);
                            }  
                        })
                    },

                    fail: (err) => {
                        console.log(err);
                    }
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    const sendKakao = async(email, profileImage, accessToken) => {
        setEmail(email);
        setProfileImage(profileImage);
        setAccessToken(accessToken);

        const response = await axios.post('http://13.209.66.117:8080/auth/kakao',{
            email: email,
            profileImage: profileImage,
            accessToken: accessToken
        })

        //register 에 넘어갈 user 정보
        userInfo.email = response.data.email;
        userInfo.profileImage = response.data.profileImage;
        userInfo.accessToken = response.data.accessToken;
        userInfo.nickname = response.data.nickname;
        userInfo.userId = response.data.userId;
        userInfo.state = response.data.state;
        userInfo.temperature = response.data.temperature;

        console.log("login console");
        console.log(response);
        console.log(userInfo);

        if(response.data.nickname===''){ // 닉네임이 없는 경우
            props.history.push({ // 닉네임 등록 화면으로
                pathname: "/register",
                state: {userInfo: userInfo}
                // state: {email : email}

            });
        }
        else{ // 닉네임 있는 경우 메인 화면으로 
            //console.log("main");

            /* 메인으로 넘어가는 코드 필요 
                메인으로 넘어갈 때도 userInfo 들고가야함 
                userInfo 에서 nickname 값 출력하는 거까지 확인부탁합니당
            */
            props.history.push({
                pathname: "/main_logged",
                state: {userInfo: userInfo}
            });
            
        }
    }

    return ( 
        <div className="loginContainer">
            <div className="logoImage">
                <img src="img/Group 291.png"/>
            </div>
            <input type="text" placeholder="아이디" className="inputIDPW"/><br/>
            <input type="text" placeholder="비밀번호" className="inputIDPW"/><br/>
            <div className="loginTextContainer">
                <div className="loginText1">
                    원터디 계정이 없으신가요?
                </div>
                <div className="loginText2">
                    회원가입
                </div>
                <div className="loginText3">
                    아이디/비밀번호 찾기
                </div>
            </div>
            <div className="loginButtons">
            <div className="normalLoginButton">로그인</div>
            <div className="kakaoLoginButton" onClick={LoginClickHandler}>
                <img src="img/Group 290.png"/>
            </div>
            </div>
        </div>
        
    )
}

export default withRouter(Login)