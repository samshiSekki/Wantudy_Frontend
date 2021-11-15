import React from 'react'
import '../css/register.css';

function Test() {
    return (
        <div className = "registerContainer" >
        <div className = "logoImage">
            <img src="img/Group 291.png"/>
        </div> 
        
        <input type="text" placeholder="닉네임 (한영 조합 8자 이내)" className="inputNick"></input>
        <div className="nickNameSaveBtn">저장</div>
        </div>
    )
}

export default Test
