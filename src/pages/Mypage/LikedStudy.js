import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function LikedStudy() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    let history = useHistory();
    const [likedList,setLikedList]= useState(["",])

    useEffect(async()=>{
        const response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/like-studylist`);
        console.log(response);
        //setLiked(response.data.msg);
    },[]);

    return (
        <div>
            <img src="img/Group 414.png" className="likedStudyImg"/>
            <NavbarWhite userInfo={userInfo}/>
            <div className="myMorePageContainer">
            <div className="myMorePageBanner">
              <div className="myMorePageTitleText">
                <p>🖇 관심 있는 스터디<br/>{userInfo.nickname}님이 스크랩한 관심 있는 스터디입니다.</p>
                
              </div>
            </div>

            
          </div>
            <Footer/>
        </div>
    )
}

export default LikedStudy
