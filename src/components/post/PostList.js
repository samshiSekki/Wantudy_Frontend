import React, { useEffect, useState } from 'react';
import { Link, Switch, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Button, Table, Pagination,List,Skeleton,Avatar,Tag, Input } from 'antd';
import axios from 'axios';
import heart from './heart.png';

const { Column } = Table;
const { Search } = Input;
function PostList({ match, history,location }) {   
  console.log(location.state.userInfo.userId)
  const _ = require('lodash');
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState(null);
  var color = new Array("magenta", "red","volcano", "orange", "gold", "lime","green", "blue","purple", "geekblue");
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
    .then(res =>setPosts(res.data))
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
      for (var i = 0; i < posts.length; i++) {
          posts[i].deadline = 
          posts[i].deadline.replaceAll("-","");
        
      }
      const orderBy = _.orderBy(posts, ['deadline'], ['desc']);
      setPosts(orderBy);


    }
    else if (key == 2) {

    }
    else if (key == 3) {
      const orderBy = _.orderBy(posts, ['created'], ['desc']);
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

 
  return (
    <>
    <div className='post-list-box'>
      <div className='post-list-field'></div>
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
            >
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
                  avatar={<Avatar src={heart} />}
                  title={ <Link to={{pathname:`post/${item.StudyId}`,state:{userInfo:location.state.userInfo}}}> {item.studyName.length > 25
                    ? item.studyName.slice(0, 25)
                    : item.studyName}</Link>
                    /* <Button onClick={()=>{history.push({pathname: `post/view/${item.StudyId}`,state: {StudyId:item.StudyId}})}}>{item.studyName}</Button> */}
                  description={<><div>{tagBox1(item.onoff)}</div>
                  <div>{tagBox2(item.category)}</div></>}/>
              </Skeleton>
              <div>마감 D - {calculateDate(item.deadline)}</div>
            </List.Item>
          )
        }
      />

            </div>

    </div>
    <Pagination defaultCurrent = {1} total={50} onChange={onChange}></Pagination>
        
        
    </>
  );
  function tagBox1(tag) {
    
    for (let i = 0; i < 1; i++) {
      var selectColor = color[Math.floor(Math.random() * color.length)];
      return <Tag color = {selectColor}>{tag}</Tag>

    }
  }
    function tagBox2(tag) {
      let arr = []
      for (let i = 0; i < tag.length; i++) {
        var selectColor = color[Math.floor(Math.random() * color.length)];
        arr.push(<Tag color = {selectColor}>{tag[i]}</Tag>)
  
      }
      return arr;

  }
  function calculateDate(date){
    let year = date.slice(0, 4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    var now = new Date();	// 현재 날짜 및 시간
    var newDay = now.getDate()-day
        return newDay;




  }
}

export default PostList;
