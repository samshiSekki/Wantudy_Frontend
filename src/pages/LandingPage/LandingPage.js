import React from "react";
import { withRouter, useLocation } from 'react-router';

function LandingPage() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    return ( <>
        <p> hi it 's samshisekki</p>
        <p>{userInfo.email}</p>
        </>
    );
}

export default LandingPage;