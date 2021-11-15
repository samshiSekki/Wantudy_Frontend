import React from 'react';
import { useState } from 'react';
import '../css/register.css';
import { withRouter, useLocation } from 'react-router';
import axios from 'axios';
import '../css/register.css';

function Register(props) {
    const location = useLocation();
    const userInfo = location.state.userInfo; //login에서 받아온 유저 정보
    const [newNickName, setNewNickName] = useState('');

    console.log(userInfo); //유저정보 출력 테스트

    function nickChange(e){
        setNewNickName(e.target.value);
    }

    const submitClickHandler = async() => {
        const response = await axios.post('http://13.209.66.117:8080/auth/nickname',{
            email: userInfo.email,
            nickName: newNickName
        });
        console.log(response.data.nickname);   
        userInfo.nickname = newNickName; // login 에서 받아온 userInfo에는 nickname 값이 공백이기 때문에, 닉네임 입력 후에는 다시 초기화해줘야함

        /* 메인으로 넘어가는 코드 필요 
            메인으로 넘어갈 때도 userInfo 들고가야함 
            userInfo 에서 nickname 값 출력하는 거까지 확인부탁합니당
        */

        props.history.push({
            pathname: "/main_logged",
            state: {userInfo: userInfo}
        });

    }

    return (
        <div className = "registerContainer" >
        <div className = "logoImage">
            <img src="img/Group 291.png"/>
        </div> 
        
        <input type="text" placeholder="닉네임 (한영 조합 8자 이내)" className="inputNick" onChange={nickChange}></input>
        <div className="nickNameSaveBtn" onClick={submitClickHandler}>저장</div>
        </div>
    )
}

export default withRouter(Register)