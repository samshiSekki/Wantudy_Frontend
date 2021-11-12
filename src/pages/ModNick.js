import React, {useState} from 'react';
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';

function ModNick(props) {
    let history = useHistory();
    let location = useLocation();
    const userInfo = location.state.userInfo;

    const [newNickName, setNewNickName] = useState('');

    //console.log(userInfo.userId); //유저정보 출력 테스트

    function nickChange(e){
        setNewNickName(e.target.value);
    }

    const submitClickHandler = async() => {
        const response = await axios.post(`http://13.209.66.117:8080/users/${userInfo.userId}/profile`,{
            nickName: newNickName
        });

        console.log(response);
        userInfo.nickname = newNickName; 


        props.history.push({ 
            pathname: "/main_logged",
            state: {userInfo: userInfo}
        });

    }
    return (
        <>
            <Navbar userInfo={userInfo}/>
            <div>
                <input type="text" placeholder="닉네임" className="inputNick" onChange={nickChange}></input>
                <button className="submitBtn" onClick={submitClickHandler}>저장</button>
            </div>
            <div className="Footer">
                <Footer/>
            </div>
        </>
    )
}
export default withRouter(ModNick)