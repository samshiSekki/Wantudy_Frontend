import React from 'react'
import { useState } from 'react';
import '../css/login.css'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const {Kakao} = window;

function Login(props) {

    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("default email");
    const [profileImage, setProfileImage] = useState("default profile img");
    const [accessToken, setAccessToken] = useState("default token")
    const [userInfo, setUserInfo] = useState({emailInfo:'', profileImageInfo:''});
 
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
                        setIsLogin(true);
                        window.Kakao.API.request({
                            url:'/v2/user/me',
                            success: res =>{
                                const kakao_account = res.kakao_account;
                                const accessToken = authData.access_token;
                                //console.log(kakao_account);
                                sendKakao(kakao_account.email, kakao_account.profile.profile_image_url, accessToken);
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
        console.log(email);
        console.log(profileImage);
        console.log(accessToken);

        const response = await axios.post('http://localhost:8080/auth/kakao',{
            email: email,
            profileImage: profileImage,
            accessToken: accessToken
        })
        console.log(response.data);


        /*register 페이지로 유저정보 넘겨주기*/
        userInfo.emailInfo=email;
        userInfo.profileImageInfo=profileImage;
        userInfo.accessToken = response.data.accessToken;
        userInfo.nickname = response.data.nickname;


        if(userInfo.nickname === ''){
            props.history.push({
                pathname: "/register",
                state: {userInfo: userInfo}
            });
        }
        
        else{
            props.history.push({
                pathname: "/main",
                state: {userInfo: userInfo}
            });
        }

        



        
    }


    return ( 
        <div className = "container" >
        <div className = "logo" > 원터디 로고 </div> 
        <button className = "loginButton" onClick = {LoginClickHandler} > 카카오로그인 </button> 
        </div>
    )
}

export default withRouter(Login)