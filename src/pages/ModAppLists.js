/*스터디 신청서 목록(제출 x)*/
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation } from 'react-router';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';


function ModAppLists() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    const [apps, setApps] = useState([]);

    useEffect(async()=>{
        const response = await axios.get(`http://13.209.66.117:8080/study/application/${userInfo.userId}`)
        console.log(response);
        setApps(response.data);
    },[]);

    return (
        <div>
            <Navbar userInfo={userInfo}/>
                <div>
                    {console.log(apps)}
                    
                </div>

            <Footer/>
        </div>
    )
}

export default ModAppLists
