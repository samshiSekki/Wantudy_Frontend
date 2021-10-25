import React from 'react'
import { useState } from 'react';
import '../css/login.css'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const {Kakao} = window;

function Login(props) {

    const [isLogin, setIsLogin] = useState(false)
    const [email, setEmail] = useState("default email")
    const [profileImage, setProfileImage] = useState("default profile img")
 
    function LoginClickHandler(){
        try {
            return new Promise((resolve, reject) => {
                if (!Kakao) {
                    reject('kakao 인스턴트 없음');
                }
                Kakao.Auth.login({
                    success: (auth) => {
                        console.log('로그인 성공', auth);
                        setIsLogin(true);
                        window.Kakao.API.request({
                            url:'/v2/user/me',
                            success: res =>{
                                const kakao_account = res.kakao_account;
                                console.log(kakao_account)

                                const email = kakao_account.email;
                                const profileImage = kakao_account.profile.profile_image_url
                                
                                sendKakao(email, profileImage);
                            }
                        })
                        /*
                        props.history.push('/register');
                        */
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

    const sendKakao = async(email, profileImage) => {
        setEmail(email);
        setProfileImage(profileImage);
        console.log(email)
        console.log(profileImage)
        const response = await axios.post('http://localhost:3001/auth/kakao',{
            email: email,
            profileImage: profileImage
        })
        console.log(response.data);
    }


    return ( 
        <div className = "container" >
        <div className = "logo" > 원터디 로고 </div> 
        <button className = "loginButton" onClick = {LoginClickHandler} > 카카오로그인 </button> 
        </div>
    )
}

export default withRouter(Login)