import React, { useState,useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Card, message, Popconfirm,Alert} from 'antd';
import usePostDetail from '../../hooks/usePostDetail';
import axios from 'axios';
import {
  postDelete,
} from '../functions/postFunctions'
import useErrorHandling from '../../hooks/useErrorHandling';
// 상세 게시글 보기
// 게시글 내용 불러오기 ->
function PostView({ match, history, location }) {
  
  const userId = location.state.userInfo.userId;
  console.log(userId)
  const studyId = match.params.id;
  const [postDetail,setPostDetail] = useState([]);
  const errorHandling = useErrorHandling();
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

  return (
    <>
        <div>
          <div>
            <Card title={insideCard()}>
              {postBox()}
            </Card>
          </div>
        </div>{' '}
    </>
  );
  function postBox() {
    return (
      <>
        <div
          style={{ padding: 10 }}
          dangerouslySetInnerHTML={{ __html: postDetail.content }}
          className="board-content"
        />
        <div>
          <div style={{ fontSize: '12px' }}>
            <div>
              <Popconfirm
                title="정말로 게시글을 삭제하시겠습니까?"
                onConfirm={onDelete}
                okText="Yes"
                cancelText="No"
              >
                <span
                  style={{
                    cursor: 'pointer',
                    // float: 'left',
                    marginRight: '12px',
                  }}
                >
                  삭제
                </span>
              </Popconfirm>
              <button onClick={onUpdate} >수정</button>
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
  function insideCard() {
    return (
      <>
        <div
          style={{
            display: 'inline-block',
            width: '100%',
            fontWeight: 'bold',
            fontSize: '22px',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line',
            overflowWrap: 'break-word',
          }}
        >
          <p>{postDetail.studyName}</p>
        </div>
        <div>
          {postDetail.userId === null ? (
            <span style={{ fontSize: '8px' }}> 탈퇴한 사용자 </span>
          ) : (
            <span style={{ fontSize: '13px' }}>
              {postDetail.userId}{' '}
            </span>
          )}
        </div>
        <div>
        <span style={{ marginLeft: '24px', fontSize: '12px' }}>
            분야 : {postDetail.category}
          </span>
          <span style={{ marginLeft: '24px', fontSize: '12px' }}>
            상세 설명 : {postDetail.description}
          </span>
        </div>
        <div>
        <span style={{ marginLeft: '24px', fontSize: '12px' }}>
            진행 방식 : {postDetail.onoff}
          </span>
          <span style={{ marginLeft: '24px', fontSize: '12px' }}>
            희망 시간대 : {postDetail.studyTime}
          </span>
        </div>
        <div>
          <span style={{ marginLeft: '24px', fontSize: '12px' }}>
            신청서 필수 열람사항 : {postDetail.requiredInfo}
          </span>
        </div>
        <div>
          <span style={{ marginLeft: '24px', fontSize: '12px' }}>
            모집 인원 : {postDetail.peopleNum}
          </span>
        </div>
      </>
    );
  }
}

export default withRouter(PostView);
