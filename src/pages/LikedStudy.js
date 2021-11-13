import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

function LikedStudy() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    let history = useHistory();
    const [liked,setLiked]= useState("")

    useEffect(async()=>{
        const response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/like-studylist`);
        console.log(response);
        setLiked(response.data.msg);
    },[]);

    return (
        <div>
            <Navbar userInfo={userInfo}/>
            {liked}
            
            <Footer/>
        </div>
    )
}

export default LikedStudy
