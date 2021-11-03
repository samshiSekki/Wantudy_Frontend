import React, {useState} from 'react'
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';
import { useCombobox } from 'downshift';
import './css/regDefaultApp.css';
import Navbar from './pages/Navbar/Navbar';
import Footer from './pages/Footer/Footer';

/*기본 지원서 등록 페이지*/
function RegDefaultApp(props) {

    let location = useLocation();
    const userInfo = location.state.userInfo;

    const [name, setName] = useState("default name"); //성명
    const [gender, setGender] = useState("default gender"); //성별
    const [age, setAge] = useState("default age"); //나이
    const [univ, setUniv] = useState("default university"); //학교
    const [major, setMajor] = useState("default major"); //전공
    const [attend, setAttend] = useState("default attend"); //재학 여부
    const [address, setAddress] = useState("default address"); //거주지

    function nameChange(e){
        setName(e.target.value);
    }

    function genderChange(e){
        setGender(e.target.value);
    }

    function ageChange(e){
        setAge(e.target.value);
    }

    function univChange(e){
        setUniv(e.target.value);
    }

    function majorChange(e){
        setMajor(e.target.value);
    }

    function attendChange(e){
        setAttend(e.target.value);
    }

    function addressChange(e){
        setAddress(e.target.value);
    }

    const submitClickHandler = async() => {
        const response = await axios.post(`http://localhost:8080/study/application`,{
            userId: userInfo.userId,
            name: name,
            gender: gender,
            age: age,
            school: univ,
            major: major,
            attending: attend,
            address: address
        });

        console.log(response);

        props.history.push({ 
            pathname: "/mypage",
            state: {userInfo: userInfo}
        });
    }

    
    return (
        <div>
            <Navbar userInfo={userInfo}/>
            <div className="rdaContainer">
                <div className="rdaContents">
                <input type="text" placeholder="성명" className="inputText" onChange={nameChange}/><br/>
                <input type="text" placeholder="성별" className="inputText" onChange={genderChange}/><br/>
                <input type="text" placeholder="나이" className="inputText" onChange={ageChange}/><br/>
                <input type="text" placeholder="학교" className="inputText" onChange={univChange}/><br/>
                <input type="text" placeholder="전공" className="inputText" onChange={majorChange}/><br/>
                <input type="text" placeholder="재학 여부" className="inputText" onChange={attendChange}/><br/>
                <input type="text" placeholder="거주지 (구 단위까지)" className="inputText" onChange={addressChange}/><br/>
                
                <button className="rdaSubmitBtn" onClick={submitClickHandler}>다음</button>
                </div>
            </div>
            <div className="Footer">
                <Footer/>
            </div>
        </div>
    )
}

export default withRouter(RegDefaultApp)
