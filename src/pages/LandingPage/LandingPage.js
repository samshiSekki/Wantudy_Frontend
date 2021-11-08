import React from "react";
import axios from 'axios';
import { withRouter, useLocation } from 'react-router';

function LandingPage() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    const init = async() => {
        const response = await axios.get(`http://13.209.66.117:8080/study/application`,{
            userId: userInfo.userId
        });
        console.log(response);
    }
    
    
    return ( 
    <>
        <p> hi it 's samshisekki</p>
        <p>hello, {userInfo.nickname}</p>
        {console.log(userInfo)}
        <button onClick={init}>테스트</button>
        
    </>
    );
}

export default LandingPage;