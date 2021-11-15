import React, { useEffect, useState } from 'react';
import { Link, Switch, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Button, Table, Pagination,List,Skeleton,message,Tag, Input } from 'antd';
import axios from 'axios';
import heart from './heart.png';
import {postScrap} from '../functions/postFunctions'
import Navbar from '../../pages/Navbar/NavbarWhite';
import Footer from '../../pages/Footer/Footer';
import bi_plus from './bi_plus.png'
import Saly from './Saly.png'

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
  console.log(posts) 
  }, [pages]);


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





  


 
  return (
    <>
    <Navbar userInfo={location.state.userInfo}/>
    <img src={Saly} className='img-saly'></img>
    <div className='post-list'>
    
    <div className='post-list-box'>
      <div className='post-list-field'>
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
      <div className='search-box'><Search placeholder="제목이나 분야를 입력해주세요.(영어는 대문자로 입력해주세요)" onSearch={onSearch} enterButton /></div>
      <div className='post-classification'>
      <Dropdown overlay={postClassification} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      정렬
    </a>
  </Dropdown>
      </div>
      <Button
              className="makepost"
              onClick={(e) => {
                register();
              }}
            ><img src = {bi_plus}></img>
              스터디 개설하기
            </Button>
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
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  // eslint-disable-next-line jsx-a11y/alt-text
                  avatar={<img /* src={heart} */ onClick={()=>{
                    postScrap(item.StudyId)
                      .then(() => {
                        message.success(
                          '스크랩에 성공했습니다. 마이페이지에서 확인할 수 있습니다.',
                        );
                      })
                      .catch((error) => {
                        console.log(error.response.data.message);
                      });
                  }} />}
                  title={ <Link to={{pathname:`post/${item.StudyId}`,state:{userInfo:location.state.userInfo}}}> {item.studyName.length > 25
                    ? item.studyName.slice(0, 25)
                    : item.studyName}</Link>
                    /* <Button onClick={()=>{history.push({pathname: `post/view/${item.StudyId}`,state: {StudyId:item.StudyId}})}}>{item.studyName}</Button> */}
                  description={<><div>{tagBox1(item.onoff)}</div>
                  <div>{tagBox2(item.category)}</div></>}/>
              </Skeleton>
              <div>{checkDeadline(item.deadline)}</div>
              <div>마감 D - {calculateDate(item.deadline)}</div>
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
      return <div>모집중</div>
    }
    else{
      return <div>모집 완료</div>
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
        return newDay;




  }
  
}

export default PostList;
