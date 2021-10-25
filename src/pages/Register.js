import React from 'react';
import { useState } from 'react';
import '../css/register.css';
import { withRouter } from 'react-router';

function Register() {
    
    const [newNickName, setNewNickName] = useState('');

    function nickChange(e){
        setNewNickName(e.target.value);
    }

    function submitClickHandler(){
        console.log(newNickName);
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
