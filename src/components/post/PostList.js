import React, { useEffect, useState } from 'react';
import { Link, Switch, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Button, Table, Pagination,List,Skeleton,message,Tag, Input } from 'antd';
import axios from 'axios';
import heart from './heart.png';
import {postScrap,postScrapDelete} from '../functions/postFunctions'
import Navbar from '../../pages/Navbar/NavbarWhite';
import Footer from '../../pages/Footer/Footer';
import bi_plus from './bi_plus.png'
import Saly from './Saly.png'

import bookmark1 from './icon_bookmark_unclick.png'

import bookmark2 from './icon_bookmark_click.png'
import greenlight from "./Ellipse999.png";
import redlight from "./Ellipse998.png";

const { Column } = Table;
const { Search } = Input;
function PostList({ match, history,location }) {   
  console.log(location.state.userInfo.userId)
  const _ = require('lodash');
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState(null);
  const [mdata, setMdata] = useState([]);
  const [selectColor, setSelectColor] = useState(false);
  const [textColor, setTextColor] = useState('black');
  const [imageset, setImageSet] = useState(bookmark1);
  const [check, setCheck] = useState(true);

  var arr = new Array();
  var imageCheck = new Array();
  var idCheck = new Array();
  var color_onoff = '#D0FFBA'
  var color_category = '#BAFFFF'
  var color_level = '#EFD5FF'
  /* axios.get(`http://13.209.66.117:8080/studylist/`, {
    params: {
      page: 1
    }
  })
  .then(res =>setPosts(res.data))
  .catch(err => console.log(err)); */
  useEffect(() => {
    axios.get(`http://13.209.66.117:8080/studylist/`, /* {
      params: {
        page: pages
      }
    } */)
    .then(res =>{setPosts(res.data); setMdata(res.data)})
    .catch(err => console.log(err));
    
  }, [pages]);

  for (var f = 0; f < posts.length; f++) {
    const index = posts.indexOf(posts[f]);
    if (imageCheck[index] == false){
      posts[f].img = bookmark2;
    }
    else{

      posts[f].img = bookmark1;
    }
   /*  console.log(posts[f]) */
} 
for (var f = 0; f < posts.length; f++) {
  posts[f].newId = f;
  
 /*  console.log(posts[f]) */
} 

  for (var i = 0; i < posts.length; i++) {
    arr[i] = bookmark1;
} 
for (var j = 0; j < posts.length; j++) {
  imageCheck[j] = false;
}   
for (var t = 0; t < posts.length; t++) {
  idCheck[j] = t;
}   



  const register = () => {
    history.push({
      pathname: `${match.url}/write`,
      state: {userInfo: location.state.userInfo}
  });
  };
  const onSearch = value => {
    let keyword = value;
    setSearch(keyword);
  };


  const handleClick = ({key}) => {
    if (key == 1) {
      for (var i = 0; i < mdata.length; i++) {
          mdata[i].deadline.replaceAll("-","");
        
      }
      const orderBy = _.orderBy(mdata, ['deadline'], ['asc']);
      setPosts(orderBy);


    }
    else if (key == 2) {
      const orderBy = _.orderBy(mdata, ['likeNum'], ['desc']);
      setPosts(orderBy);

    }
    else if (key == 3) {
      const orderBy = _.orderBy(mdata, ['created'], ['desc']);
      setPosts(orderBy);



    } 

  }

  const postClassification = (
    <Menu onClick={handleClick}>
      <Menu.Item key="1">
        <a>마감임박순</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a>찜순</a>
      </Menu.Item>
      <Menu.Item key="3">최신순</Menu.Item>
    </Menu>
    
  );

  function onChange(pageNumber) {
    setPages(pageNumber);
  }
  
  const categoryChange= (value) => {
    console.log(value)
    const orderBy = mdata.filter((data)=>{
      if(value == null){
          return data
      }
      else if(data.category.includes(value)){
          return data
      }})
    setPosts(orderBy);


  }

/*   const onScrap = () => {
    if (imageCheck) {
      setImageCheck(false)
      setImageSet(bookmark1)
      postScarpDelete(item.StudyId)
      .then(() => {
        message.success(
          '스크랩을 취소하셨습니다.',
        );
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    }
    else {
      setImageCheck(true)
      setImageSet(bookmark2)
      postScrap(item.StudyId)
        .then(() => {
          message.success(
            '스크랩에 성공했습니다. 마이페이지에서 확인할 수 있습니다.',
          );
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }
  }
 */



 
  return (
    <>
    <Navbar userInfo={location.state.userInfo}/>
    <div className="post-title">
                    안녕하세요, {location.state.userInfo.nickname}님👋<br/>
                    원터디와 함께<br/>
                    원하는 스터디를 찾아보세요.
                    </div>
    <img src={Saly} className='img-saly'></img>
    <div className='post-list'>
    
    <div className='post-list-box'>
      <div>
        <button className='button-all' onClick={()=>{categoryChange(null)}}>전체</button>
        <button className='button-1' onClick={()=>{categoryChange('개발 / 프로그래밍')}}>개발 / 프로그래밍</button>
        <button className='button-2' onClick={()=>{categoryChange('마케팅')}}>마케팅</button>
        <button className='button-3' onClick={()=>{categoryChange('기획')}}>기획</button>
        <button className='button-4' onClick={()=>{categoryChange('데이터 분석')}}>데이터 분석</button>
        <button className='button-5' onClick={()=>{categoryChange('디자인')}}>디자인</button>
        <button className='button-6' onClick={()=>{categoryChange('인공지능')}}>인공지능</button>
        <button className='button-7' onClick={()=>{categoryChange('어학')}}>어학</button>
        <button className='button-8' onClick={()=>{categoryChange('취업')}}>취업</button>
      </div>
      <Button
              className="makepost"
              onClick={(e) => {
                register();
              }}
            ><img src = {bi_plus}></img>
              스터디 개설하기
            </Button>
      <div className='search-box'><Search size='large' placeholder="찾으시는 스터디가 있으신가요?" onSearch={onSearch} /></div>
      <div className='post-classification'>
      <Dropdown overlay={postClassification} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      정렬
    </a>
  </Dropdown>
      </div>
      <div>
      <input type="checkbox" onClick={()=>{filterStudy()}}></input><label>모집 중인 스터디만 보기</label>
      </div>
            <div className='study-list-box'>
            <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={posts.filter((data)=>{
          if(search == null){
              return data
          }
          else if(data.studyName.includes(search) || data.category.includes(search)){
              return data
          }})}
        renderItem={item =>
          console.log(item) || (
            <List.Item
            >
             
                <List.Item.Meta
                  // eslint-disable-next-line jsx-a11y/alt-text
                  className="post-lists"
                  // eslint-disable-next-line jsx-a11y/alt-text
                  avatar={<img id = {item.newId} src={item.img} onClick={() => {
                    const index = posts.indexOf(item);
                    if (imageCheck[index] == false) {
                      imageCheck[index] = true;
                      item.img = bookmark2;
                      document.getElementById(item.newId).src= bookmark2;
                      
                      console.log(imageCheck[index], arr[index])
                      let body = {
                        "userId": location.state.userInfo.userId,
                      }
                      postScrap(item.StudyId,body)
                      .then(() => {
                        message.success(
                          '스크랩에 성공했습니다. 마이페이지에서 확인할 수 있습니다.',
                        );
                      })
                      .catch((error) => {
                        console.log(error.response.data.message);
                      });
                      
console.log(arr, imageCheck)
                    
                    }
                    else if (imageCheck[index] == true) {
                      const index = posts.indexOf(item);
                      imageCheck[index] = false;
                      arr[index] = bookmark1;
                      document.getElementById(item.newId).src= bookmark1;
                      let body = {
                        "userId": location.state.userInfo.userId,
                      }
                      axios.delete(`http://13.209.66.117:8080/studylist/${item.StudyId}/cancel-like`,{
                        data: {
                          userId: location.state.userInfo.userId,
                          studyId:item.StudyId,
                        }
                      })
                      .then(function (response) {
                        message.success(
                          '스크랩을 취소하셨습니다.',
                        );
                      })
                      .catch(function (error) {
                        // handle error
                        console.log(error);
                      })
                      .then(function () {
                        // always executed
                      });
                      /* postScrapDelete(item.StudyId,body)
                      .then(() => {
                        message.success(
                          '스크랩을 취소하셨습니다.',
                        );
                      })
                      .catch((error) => {
                        console.log(error.response.data.message);
                      });
                 */
                   
                    }
                  }
                  }/>}
                  title={ <Link to={{pathname:`post/${item.StudyId}`,state:{userInfo:location.state.userInfo}}}> {item.studyName.length > 25
                    ? item.studyName.slice(0, 25)
                    : item.studyName}</Link>
                    /* <Button onClick={()=>{history.push({pathname: `post/view/${item.StudyId}`,state: {StudyId:item.StudyId}})}}>{item.studyName}</Button> */}
                  description={<><div>{tagBox1(item.onoff)}</div>
                  <div style={{float:'left'}}>{tagBox2(item.category)}</div>
                  
              </>}
              
              />
              <div className="check-deadline">{checkDeadline(item.deadline)}</div>
              <div className="calculate-date">마감 D {calculateDate(item.deadline)}</div>
              <div className="people-number"> 인원 현황 {item.currentNum} / {item.peopleNum}</div>
              
             
             
            </List.Item>
          )
        }
      />

            </div>

    </div>
    <Pagination defaultCurrent = {1} total={50} onChange={onChange}></Pagination>
    </div>
        <Footer/>
        
    </>
  );

  function checkDeadline(deadline) {
    console.log(deadline)
    console.log(new Date().toISOString())
    if (deadline.valueOf() > new Date().toISOString().valueOf()){
      return <div><img src = {greenlight}></img>    모집 중</div>
    }
    else{
      return <div><img src = {redlight}></img>    모집 완료</div>
    }
  }
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

  function filterStudy() {
    
    setCheck(!check);
    const orderBy = mdata.filter((data)=>{
      let day = data.deadline.slice(8,10);
    var now = new Date();	// 현재 날짜 및 시간
    var newDay = day - now.getDate()
    if (check) {
      if(newDay >0){
        return data
    }
    else{
        return null
    }}
    else { return data

    }

    })
    setPosts(orderBy);
  }
  
}

export default withRouter(PostList);
