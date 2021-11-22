import React, { useState,useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Card, message, Popconfirm,Alert,Modal,Button,Radio,Tag} from 'antd';
import usePostDetail from '../../hooks/usePostDetail';
import axios from 'axios';
import {
  postDelete,registerPost
} from '../functions/postFunctions'
import useErrorHandling from '../../hooks/useErrorHandling';
import Navbar from '../../pages/Navbar/NavbarWhite';
import Footer from '../../pages/Footer/Footer';
import nicknameImg from './Ellipse1000.png';
import Group246 from './Group246.png';
import greenlight from "./Ellipse999.png";
import redlight from "./Ellipse998.png";

// 상세 게시글 보기
// 게시글 내용 불러오기 ->
function PostView({ match, history, location }) {
  
  const userId = location.state.userInfo.userId;
  console.log(userId)
  const studyId = match.params.id;
  const [postDetail,setPostDetail] = useState([]);
  const errorHandling = useErrorHandling();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [registerList, setRegisterList]=useState([]);
  const [isButtonVisible, setIstButtonVisible] = useState(true);

  const [isListVisible, setIsListVisible] = useState(false);
  const [selectList, setSelectList] = useState();

  var color_onoff = '#D0FFBA'
  var color_category = '#BAFFFF'
  var color_level = '#EFD5FF'

  const showModal = () => {
    /* setIsModalVisible(true); */
    history.push({
      pathname: `${postDetail.StudyId}/apply`,
      state: {id: postDetail.StudyId, userInfo:location.state.userInfo, posts:postDetail}
    })
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

/*   async function fetchData(){
    postDetaill = await axios.get(`http://13.209.66.117:8080/studylist/${studyId}`
    ,{
      params: {
        StudyId: studyId
      }});
      setPostDetail(postDetaill.data.data)
      
    }
    
    
  
  useEffect(() => {
    
    fetchData();
      console.log(postDetail)

  }, [])   */
  /*  axios.get(`http://13.209.66.117:8080/studylist/${studyId}`, {
      params: {
        studyId : studyId
      }
    })
    .then(res =>setPostDetail(res.data))
    .catch(err => console.log(err));  */

  useEffect(() => {
    console.log(studyId);
    axios.get(`http://13.209.66.117:8080/studylist/${studyId}`, {
      params: {
        studyId : studyId
      }
    })
    .then(res =>setPostDetail(res.data.data))
    .catch(err => console.log(err));
    console.log(postDetail)

  }, []);

  const onDelete = () =>{
    if (postDetail.userId === userId) {
      postDelete(studyId)
      .then(() => {
        message.success('게시글 삭제가 완료되었습니다.');
        history.goBack();
      })
      .catch((error) => {
        errorHandling(error.response.data.message);
      });
    }
    else {
      <Alert message="삭제할 권한이 없습니다." type="error" showIcon />

    }
  
    }

    const onUpdate = () =>{
      if (postDetail.userId === userId) {
        history.push({
          pathname: `${postDetail.StudyId}/update`,
          state: {id: postDetail.StudyId}
        })
      }
      else {
        <Alert message="수정할 권한이 없습니다." type="error" showIcon />
  
      }
    }

    const onRegister=()=>{
      setIstButtonVisible(false);
      setIsListVisible(!isListVisible);
      console.log(userId)
      axios.get(`http://13.209.66.117:8080/users/${userId}/application`, {
        params: {
          userId : userId,
        }
      })
      .then(res =>setRegisterList(res.data))
      .catch(err => console.log(err));
      console.log(registerList)

    }
    
    const handleSelet=(li)=>{
      if (selectList ==  null) {
        setSelectList(li.applicationId)
      }
      
    }
    
    const handleRegister=()=>{
      console.log(selectList)
      let body = {
        "userId": userId,
  "applicationId": selectList,
      }

      registerPost(studyId, body)
      .then(() => {
        history.goBack();
        message.success('신청 완료!');
      })
      .catch((error) => {
        errorHandling(error.response?.data.message);
      });
    }


  return (
    <>
    <Navbar userInfo={location.state.userInfo}/>
        <div>
          <div>
            <Card title={insideCard()}>
              {postBox()}
            </Card>
          </div>
          <img style={{marginLeft:'400px', marginBottom:'20px'}}src={Group246}></img>
        </div>{' '}
        
        <Footer/>
    </>

  );
  function postBox() {
    return (
      <>=
        <div
          style={{ padding: 10 }}
          dangerouslySetInnerHTML={{ __html: postDetail.content }}
          className="board-content"
        />
        <div>
          <div>
            <div>
              <button className="button-delete"
                onClick={onDelete}
              >
                  삭제
              </button>
              <button className="button-fix" onClick={onUpdate} >수정</button>
              <button className="button-register" onClick={showModal} >신청 하기</button>
              <Modal title="Basic Modal" visible={isModalVisible} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }}>
        <p>해당 스터디를 신청하시겠습니까?</p>{isButtonVisible? (<><button onClick={onRegister}>예</button><button onClick={handleCancel}>아니요</button></>):<div></div>}
        <div>{isListVisible ? (registerList.map((li)=>showRegisterList(li))) : <div></div>}</div>
        <div>{isListVisible ? (<><button onClick={handleRegister}>신청</button></>):<div></div>}</div>
      </Modal>
                {/* <Link to={`${postDetail.StudyId}/update`}>
                  <span>수정</span>
                </Link> */}
            </div>
          </div>{' '}
        </div>
        <div>
          <hr />
        </div>
      </>
    );
  }
  function showRegisterList(li){
    let arr = []
    console.log(li)
   if (registerList[0].applicationId == li.applicationId) {


    arr.push(<><input type="radio" value={li.applicationId} onClick={selectList == null ? setSelectList(li.applicationId):null}></input><label>대표 지원서 : {li.applicationId}</label></>)

   }
   else{
    arr.push(<><input type="radio" value={li.applicationId} onClick={selectList == null ? setSelectList(li.applicationId):null}></input><label>{li.applicationId}</label></>)
   }
   return arr;
  }
 
  
  
  function insideCard() {
    
    return (
      <div className="all-box">
        <div className="study-name-box"
        >
           <div>
          {postDetail.userId === null ? (
            <span> 탈퇴한 사용자 </span>
          ) : (
            <>
            <img style={{float:'left'}}src={nicknameImg}></img>
            <div className="study-name-detail">
              '{postDetail.nickname}'{'님의 스터디 공고입니다! '}
            </div>
            {postDetail.deadline != null ? (<><div style={{float:'left', marginLeft:'10px',marginTop:'5px',fontSize:'14px',fontWeight:'300'}}>{checkDeadline(postDetail.deadline)}</div><div style={{float:'left',color:'#D0D0D0'}}>   &nbsp;    |</div><div style={{marginLeft:'140px',marginTop:'4px',fontSize:'14px',fontWeight:'300'}}>마감 D {calculateDate(postDetail.deadline)}</div></>):<div></div>}

            
            </>
          )}
        </div>
          <p className="study-name-detail2">{postDetail.studyName}</p>
          
        </div>
       
        <div className="study-view-field-text">
            <p className="study-view-field-text2">분야</p><div className="study-view-field">
              {postDetail.category != null ?(<div>{tagBox2(postDetail.category)}</div>):<div></div>}</div>
          </div>
          <div className="study-view-description">
            <p className="study-view-description-text">상세 설명</p> <div  className="study-view-description-text2"> {postDetail.description}
          </div></div>
          <div className="study-view-level">
            <p className="study-view-level-text">난이도</p> <div  className="study-view-level-text2">
               {postDetail.level != null ?(<div>{tagBox4(postDetail.category)}</div>):<div></div>}
          </div></div>
        <div className="study-view-onoff">
        <p className="study-view-onoff-text">진행 방식</p> <div className="study-view-onoff-text2"> 
        {postDetail.onoff != null ?(<div>{tagBox1(postDetail.onoff)}</div>):<div></div>}</div>
          </div>
          <div className="study-view-period">
          <p className="study-view-period-text">
            진행 기간</p> <div className="study-view-period-text2">{postDetail.period}개월</div>
        </div>
          <div className="study-view-studytime">
          <p className="study-view-studytime-text">
            희망 시간대</p> <div className="study-view-studytime-text2">
              {postDetail.studyTime != null ?(<div>{tagBox3(postDetail.studyTime)}</div>):<div></div>}</div>
        </div>
        <div className="study-view-required">
          <p  className="study-view-required-text">
            신청서 필수 열람사항</p> <div className="study-view-required-text2">
              {postDetail.requiredInfo != null ?(<div>{tagBox5(postDetail.requiredInfo)}</div>):<div></div>}</div>
        </div>
        <div className="study-view-peoplenum">
          <p className="study-view-peoplenum-text">
            모집 인원 </p> <div  className="study-view-peoplenum-text2">{postDetail.peopleNum}명</div> 
        </div>
        <div className="study-view-deadline">
          <p className="study-view-deadline-text">
            모집 마감일 </p> <div  className="study-view-deadline-text2">
              {postDetail.deadline != null ?(<div>{postDetail.deadline.slice(0,10)}</div>):<div></div>}</div> 
        </div>
      </div>
    );
  }

  function checkDeadline (deadline) {
    console.log(deadline)
    console.log(new Date().toISOString())
    if (deadline.valueOf() > new Date().toISOString().valueOf()){
      return <div><img src = {greenlight}></img>    모집 중</div>
    }
    else{
      return <div><img src = {redlight}></img>    모집 완료</div>
    }
  }
  
  
}

var color_onoff = '#D0FFBA'
var color_category = '#BAFFFF'
var color_level = '#EFD5FF'
var color_time = '#FFE194'

function tagBox1(tag) {
  let arr = []
  for (let i = 0; i < tag.length; i++) {
    arr.push(<Tag color = {color_onoff} style={{color:'black',float:'left'}}>{tag[i]}</Tag>)


  }
  return arr;
}
function tagBox2(tag) {
  let arr = []
  for (let i = 0; i < tag.length; i++) {
    arr.push(<Tag color = {color_category} style={{color:'black'}}>{tag[i]}</Tag>)

  }
  return arr;

}
function tagBox3(tag) {
  let arr = []
  for (let i = 0; i < tag.length; i++) {
    arr.push(<Tag color = {color_time} style={{color:'black'}}>{tag[i]}</Tag>)

  }
  return arr;

}
function tagBox4(tag) {
  let arr = []
  for (let i = 0; i < tag.length; i++) {
    arr.push(<Tag color = {color_level} style={{color:'black'}}>{tag[i]}</Tag>)

  }
  return arr;

}
function tagBox5(tag) {
  let arr = []
  for (let i = 0; i < tag.length; i++) {
    arr.push(<Tag style={{color:'black'}}>{tag[i]}</Tag>)

  }
  return arr;

}
function calculateDate(date){
  let year = date.slice(0, 4);
  let month = date.slice(5,7);
  let day = date.slice(8,10);
  var now = new Date();	// 현재 날짜 및 시간
  var newDay = day - now.getDate()
  if (newDay > 0) {return '- ' + newDay}
  else if (newDay == 0) { return '- Day'}
  else if (newDay < 0 ) {return '+ ' + Math.abs(newDay)}




}

export default withRouter(PostView);
