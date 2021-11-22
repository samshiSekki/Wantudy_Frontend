import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function Schedule() {
    const location = useLocation();
    const history = useHistory();
    const userInfo = location.state.userInfo;
    const studyInfo = location.state.studyInfo;
    const isManager = location.state.isManager;
    const participants = location.state.participants;

    console.log(participants);

    return (
        <div>
            <NavbarWhite userInfo={userInfo}/>
            <div className="myMorePageContainer">
                <div className="ongoingStudyDetailTitle">
                    {studyInfo.studyName}
                </div>

                <div className="participantsPics">
                    <div className="participantsPicsContainer">
                    {
                        participants.map((a,i)=>{
                            if(participants[i].userId == studyInfo.userId){
                                return (
                                    <>
                                    <img src="img/Group 420.png" className="managerLabelImg"/>
                                    <img src={participants[i].profileImage} className="participantsProfileImg"/>
                                    </>
                                )
                            }
                            else{
                                return <img src={participants[i].profileImage} className="participantsProfileImg"/>
                            }
                        })
                    }
                    </div>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Schedule
