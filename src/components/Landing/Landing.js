import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'antd';

function Landing({match}) {
    return ( <>
    <Link to="/post">
    <Button> go to post list</Button> 
    </Link> 
        </>
    );
}

export default Landing;