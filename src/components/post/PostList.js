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
  
} 
for (var f = 0; f < posts.length; f++) {
  posts[f].newId = f;

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
        <a>???????????????</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a>??????</a>
      </Menu.Item>
      <Menu.Item key="3">?????????</Menu.Item>
    </Menu>
    
  );

  function onChange(pageNumber) {
    setPages(pageNumber);
  }
  
  const categoryChange= (value) => {
    
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
    <div className="post-title">
                    ???????????????, {location.state.userInfo.nickname}???????<br/>
                    ???????????? ??????<br/>
                    ????????? ???????????? ???????????????.
                    </div>
    <img src={Saly} className='img-saly'></img>
    <div className='post-list'>
    
    <div className='post-list-box'>
      <div>
        <button className='button-all' onClick={()=>{categoryChange(null)}}>??????</button>
        <button className='button-1' onClick={()=>{categoryChange('?????? / ???????????????')}}>?????? / ???????????????</button>
        <button className='button-2' onClick={()=>{categoryChange('?????????')}}>?????????</button>
        <button className='button-3' onClick={()=>{categoryChange('??????')}}>??????</button>
        <button className='button-4' onClick={()=>{categoryChange('????????? ??????')}}>????????? ??????</button>
        <button className='button-5' onClick={()=>{categoryChange('?????????')}}>?????????</button>
        <button className='button-6' onClick={()=>{categoryChange('????????????')}}>????????????</button>
        <button className='button-7' onClick={()=>{categoryChange('??????')}}>??????</button>
        <button className='button-8' onClick={()=>{categoryChange('??????')}}>??????</button>
      </div>
      <Button
              className="makepost"
              onClick={(e) => {
                register();
              }}
            ><img src = {bi_plus}></img>
              ????????? ????????????
            </Button>
      <div className='search-box'><Search size='large' placeholder="???????????? ???????????? ????????????????" onSearch={onSearch} /></div>
      <div className='post-classification'>
      <Dropdown overlay={postClassification} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      ??????
    </a>
  </Dropdown>
      </div>
      <div>
      <input type="checkbox" onClick={()=>{filterStudy()}}></input><label>?????? ?????? ???????????? ??????</label>
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
          (
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
                    
                      let body = {
                        "userId": location.state.userInfo.userId,
                      }
                      postScrap(item.StudyId,body)
                      .then(() => {
                        message.success(
                          '???????????? ??????????????????. ????????????????????? ????????? ??? ????????????.',
                        );
                      })
                      .catch((error) => {
                       
                      });
                      
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
                          '???????????? ?????????????????????.',
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
                          '???????????? ?????????????????????.',
                        );
                      })
                      .catch((error) => {
                        console.log(error.response.data.message);
                      });
                 */
                   
                    }
                  }
                  }/>}
                  title={ <p style={{fontSize:'20px'}}><Link to={{pathname:`post/${item.StudyId}`,state:{userInfo:location.state.userInfo}}}> {item.studyName}</Link></p>
                    /* <Button onClick={()=>{history.push({pathname: `post/view/${item.StudyId}`,state: {StudyId:item.StudyId}})}}>{item.studyName}</Button> */}
                  description={<><div>{tagBox1(item.onoff)}</div>
                  <div style={{float:'left'}}>{tagBox2(item.category)}</div>
                  <div style={{float:'left'}}>{tagBox3(item.level)}</div>
                  
              </>}
              
              />
              <div className="check-deadline">{checkDeadline(item.deadline)}</div>
              <div className="calculate-date">?????? D {calculateDate(item.deadline)}</div>
              <div className="people-number"> ?????? ?????? {item.currentNum} / {item.peopleNum}</div>
              
             
             
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
   
    if (deadline.valueOf() > new Date().toISOString().valueOf()){
      return <div><img src = {greenlight}></img>    ?????? ???</div>
    }
    else{
      return <div><img src = {redlight}></img>    ?????? ??????</div>
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
  function tagBox3(tag) {
    console.log(tag)
    let arr = []
    for (let i = 0; i < 1; i++) {
      arr.push(<Tag color = {color_level} style={{color:'black'}}>{tag}</Tag>)

    }
    return arr;

}
  function calculateDate(date){
    let year = date.slice(0, 4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    var now = new Date();	// ?????? ?????? ??? ??????
    var newDay = day - now.getDate()
    if (newDay > 0) {return '- ' + newDay}
    else if (newDay == 0) { return '- Day'}
    else if (newDay < 0 ) {return '+ ' + Math.abs(newDay)}




  }

  function filterStudy() {
    
    setCheck(!check);
    const orderBy = mdata.filter((data)=>{
      let day = data.deadline.slice(8,10);
    var now = new Date();	// ?????? ?????? ??? ??????
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
