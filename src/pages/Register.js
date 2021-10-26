import React from 'react';
import { useState } from 'react';
import '../css/register.css';
import { withRouter, useLocation } from 'react-router';
import axios from 'axios';

function Register() {
    
    const location = useLocation();
    const userInfo = location.state.userInfo; //login에서 받아온 유저 정보
    const [newNickName, setNewNickName] = useState('');

    //console.log(userInfo); //유저정보 출력 테스트

    function nickChange(e){
        setNewNickName(e.target.value);
    }

    const submitClickHandler = async() => {
        console.log(newNickName);

        const response = await axios.post('',{
            nickName: newNickName
        });

        console.log(response.data);
    }

    return (
        <div className = "container" >
        <div className = "logo" > 원터디 로고 </div> 
        <input type="text" placeholder="닉네임" className="inputNick" onChange={nickChange}></input>
        <button className="submitBtn" onClick={submitClickHandler}>저장</button>
        </div>
    )
}

export default withRouter(Register)
