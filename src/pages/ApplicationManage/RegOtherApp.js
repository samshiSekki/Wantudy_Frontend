import React, {useState} from 'react'
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import '../../css/regDefaultApp.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import NavbarWhite from '../Navbar/NavbarWhite';

/*기타 지원서 등록 페이지*/
function RegOtherApp(props) {

    let location = useLocation();
    const userInfo = location.state.userInfo;

    const [name, setName] = useState("default name"); //성명
    const [gender, setGender] = useState("남자"); //성별
    const [age, setAge] = useState("default age"); //나이
    const [school, setSchool] = useState("default school"); //학교
    const [major, setMajor] = useState("default major"); //전공
    const [attend, setAttend] = useState("재학"); //재학 여부
    const [address, setAddress] = useState("default address"); //거주지

    function nameChange(e){
        setName(e.target.value);
    }

    function ageChange(e){
        setAge(e.target.value);
    }

    function schoolChange(e){
        setSchool(e.target.value);
    }

    function majorChange(e){
        setMajor(e.target.value);
    }

    function addressChange(e){
        setAddress(e.target.value);
    }

    const submitClickHandler = async() => {
        let response = await axios.post(`http://13.209.66.117:8080/study/application`,{
            userId: userInfo.userId,
            applicationName: "jaemOtherApp",
            name: name,
            gender: gender,
            age: parseInt(age),
            school: school,
            major: major,
            attending: attend,
            semester: [1],
            address: address,
            interests: ["큐시즘"],
            keyword: ["큐시즘"]
        });

        response = await axios.get('http://13.209.66.117:8080/auth/kakao');

        console.log(response);
        userInfo.state = response.data.state;
        console.log(userInfo);

        props.history.push({ 
            pathname: "/mod_app_lists",
            state: {userInfo: userInfo}
        });
    }

    return (
        <div>
            
        </div>
    )
}

export default RegOtherApp
