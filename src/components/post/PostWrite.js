import React, { useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { withRouter } from 'react-router-dom';
import { postSave } from '../functions/postFunctions';
import { Button, Input, message, Select, Form,Radio, InputNumber,Modal, DatePicker, Checkbox, Divider } from 'antd';
import useErrorHandling from '../../hooks/useErrorHandling';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Navbar from '../../pages/Navbar/NavbarWhite';
import Footer from '../../pages/Footer/Footer';
import Group1 from './Group-278.png'
import vectorimg from './Vector395.png'

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
const {RangePicker} = DatePicker;


function PostWrite(props) {
  console.log(props.location)
  const { Option } = Select;
  const dateFormat = "YYYY-MM-DD";
  const today = moment();
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const errorHandling = useErrorHandling();
  const [level, setLevel] = useState(); //난이도
  const [value, setvalue] = useState({ userId:props.location.state.userInfo.userId,studyName:'', category:[], description:'',onoff:'',studyTime:'',peopleNum:0,requiredInfo:[],deadline:'2021-11-03', period:0, level:level});
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    setvalue({ ...value, requiredInfo: list })
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      userId: value.userId,
        studyName:value.studyName, 
        category:value.category, 
        description:value.description,
        onoff:value.onoff,
        studyTime:value.studyTime,
        peopleNum:value.peopleNum,
        requiredInfo:value.requiredInfo,
        deadline:value.deadline,
        period:value.period,
        level:value.level,
    };
    postSave(body)
      .then(() => {
        props.history.goBack();
        message.success('작성 완료');
      })
      .catch((error) => {
        errorHandling(error.response?.data.message);
      });
  };
  const onExit = () => {
    const answer = window.confirm(
      '작성하던 글은 저장되지 않습니다. 그래도 나가시겠습니까?',
    );
    if (answer) {
      props.history.goBack();
  };
}

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

 /*  function onChange(date, dateString) {
    setvalue({ ...value, deadline: dateString });
    console.log(dateString);
  } */
  const children = [];
for (let i = 0; i < 10; i++) {
  if (i == 0) {
    children.push(<Option key={'개발 / 프로그래밍'}>{'개발 / 프로그래밍'}</Option>);

  }
  else if (i == 1) {
    children.push(<Option key={'마케팅'}>{'마케팅'}</Option>);

  }
  else if (i == 2) {
    children.push(<Option key={'기획'}>{'기획'}</Option>);

  }
  else if (i == 3) {
    children.push(<Option key={'데이터 분석'}>{'데이터 분석'}</Option>);
    
  }
  else if (i == 4) {
    children.push(<Option key={'인공지능'}>{'인공지능'}</Option>);
    
  }
  else if (i == 5) {
    children.push(<Option key={'데이터 시각화'}>{'데이터 시각화'}</Option>);
    
  }
  else if (i == 6) {
    children.push(<Option key={'디자인'}>{'디자인'}</Option>);
    
  }
  else if (i == 7) {
    children.push(<Option key={'어학'}>{'어학'}</Option>);
    
  }
  else if (i == 8) {
    children.push(<Option key={'취업'}>{'취업'}</Option>);
    
  }
  else if (i == 9) {
    children.push(<Option key={'직접 입력'}>{'직접 입력'}</Option>);
    
  }
  
}
const children2 = [];
for (let i = 0; i < 10; i++) {
  if (i == 0) {
    children2.push(<Option key={'성명'}>{'성명'}</Option>);

  }
  else if (i == 1) {
    children2.push(<Option key={'성별'}>{'성별'}</Option>);

  }
  else if (i == 2) {
    children2.push(<Option key={'나이'}>{'나이'}</Option>);

  }
  else if (i == 3) {
    children2.push(<Option key={'학교'}>{'학교'}</Option>);
    
  }
  else if (i == 4) {
    children2.push(<Option key={'전공'}>{'전공'}</Option>);
    
  }
  else if (i == 5) {
    children2.push(<Option key={'재학 여부'}>{'재학 여부'}</Option>);
    
  }
  else if (i == 6) {
    children2.push(<Option key={'거주지'}>{'거주지'}</Option>);
    
  }
  else if (i == 7) {
    children2.push(<Option key={'관심 분야'}>{'관심 분야'}</Option>);
    
  }
  else if (i == 8) {
    children2.push(<Option key={'자신을 표현하는 keyword'}>{'자신을 표현하는 keyword'}</Option>);
    
  }
  else if (i == 9) {
    children2.push(<Option key={'지원 동기'}>{'지원 동기'}</Option>);
    
  }
  
}
const plainOptions = [
  {label:'오프라인', value:'오프라인'},
  {label: '온라인', value:'온라인'},
  {label:'혼합',value:['오프라인','온라인']}
];
const plainOptions2 = [
  {label:'입문', value:'입문'},
  {label: '기본', value:'기본'},
  {label:'심화',value:'심화'},
];


  return (
    <>
    <Navbar userInfo={props.location.state.userInfo}/>
    <div className='post-empty'>
    <div className="post-title">
                    안녕하세요, {props.location.state.userInfo.nickname}님👋<br/>
                    스터디 개설을 위한<br/>
                    스터디원 모집 게시물을 작성해주세요.
                    </div>
      <div><img className='imgGroup1' src={Group1}/></div>
    </div>

     <div className='post-write-box'>
       <div className='study-title'>스터디원 모집 게시물</div>
       <div className='study-title-small'>‘<img src={vectorimg}/>’는 반드시 작성해야 하는 필수적인 문항입니다.</div>
       <hr />
      <div><div className='study-name'> <img src={vectorimg} />          스터디명</div>
            <div>
      <Input
          className="title-bar"
          type="text"
          value={value.studyName}
          onChange={(e) => {console.log(value)
            setvalue({ ...value, studyName: e.target.value });
          }}
        />
        </div>
        <hr />
        <div className='field-text'><img src={vectorimg} />          분야</div>
        <Select
      mode="tags"
      className="field-select"
      placeholder="개설 분야"      
      value = {value.category}
      showArrow={true}
      allowClear={true}
        notFoundContent={null}
      onChange={(e) => {
        setvalue({ ...value, category: e })}}
    >
      {children}
    </Select>
        {/* <Input
          className="title-bar"
          type="text"
          placeholder="분야"
          value={value.category}
          onChange={(e) => {
            setvalue({ ...value, category: e.target.value });
          }}
        /> */}
        <hr />
        <div className='description-text'><img src={vectorimg} />          상세 설명</div>
        <div>
        <Input
          className="description-bar"
          type="text"
          value={value.description}
          onChange={(e) => {
            setvalue({ ...value, description: e.target.value });
          }}
        /></div>
        <hr />
        <div className="level-text"><img src={vectorimg} />          난이도</div>
        {/* <button className={level=="입문"? "femaleSelectedButton" : "femaleButton"} value={value.level} onClick={(e)=>{setLevel("입문");
        console.log(value); setvalue({ ...value, level: e.target.innerText })}} >입문</button>
                    <button className={level=="기본"? "maleSelectedButton" : "maleButton"} value={value.level} onChange={(e) => {
            setvalue({ ...value, level: e.target.innerText });
          }} onClick={()=>(setLevel("기본"))}>기본</button>
                    <button className={level=="심화"? "maleSelectedButton" : "maleButton"} value={value.level} onChange={(e) => {
            setvalue({ ...value, level: e.target.innerText });
          }}onClick={()=>(setLevel("심화"))}>심화</button> */}

<Radio.Group
      className="level-bar"
      size='large'
          options={plainOptions2}
          onChange={(e) => {
            setvalue({ ...value, level: e.target.value })}}
          value={value.level}
          optionType="button"
        />
        {/* <Input
          className="level-bar"
          type="text"
          placeholder="level"
          value={value.level}
          onChange={(e) => {
            setvalue({ ...value, level: e.target.value });
          }}
        /> */}
        <hr/>
      <Form
      name="validate_other"
    > <div className="onoff-text">진행 방식</div> 
      <Radio.Group
      className="onoff-bar"
      size='large'
          options={plainOptions}
          onChange={(e) => {
            setvalue({ ...value, onoff: e.target.value })}}
          value={value.onoff}
          optionType="button"
        />
      {/* <Checkbox.Group className="onoff-bar" options={plainOptions} value = {value.onoff} onChange={(e) => {
        setvalue({ ...value, onoff: e })}}/> */}
        <hr/>
        <div className='period-text'>진행 기간</div>
            
        <Form.Item className='period-bar'
         value={value.period}
         onChange={(e) => {
           setvalue({ ...value, period: parseInt(e.target.value) });}}>
          <InputNumber min={1} max={14} />개월
        </Form.Item>        
        
      
          {/* <Form.Item
        name="radio-button"
        label="진행 방식"
        value={value.onoff}
          onChange={(e) => {
            setvalue({ ...value, onoff: e.target.value });}}
      >        <Radio.Group>
          <Radio.Button value="온라인">온라인</Radio.Button>
          <Radio.Button value="오프라인">오프라인</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
      <hr />
      <div className='time-text'><img src={vectorimg} />          희망 시간대</div> <Select mode="tags" className='time-bar' placeholder="원하는 시간대를 입력한 다음 엔터를 눌러주세요! (ex. 월 12-15)" onChange={(e) => {
          setvalue({ ...value, studyTime: e });}}>
  </Select>
{/* 
      <Form.Item
        name="radio-button"
        label="희망 시간대"
        value={value.studyTime}
        onChange={(e) => {
          setvalue({ ...value, studyTime: e.target.value });}}
      >        <Radio.Group>
          <Radio.Button value="화 13-15">화 13-15</Radio.Button>
          <Radio.Button value="금 15-17">금 15-17</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
      <hr />
      <div className='required-text'><img src={vectorimg} />          신청서 필수 기재 사항</div>
      {/* <Checkbox.Group options={plainOptions} value = {value.requiredInfo} onChange={(e) => {
        setvalue({ ...value, requiredInfo: e })}}/> */}
      <Select
      mode="multiple"
      allowClear
      className='required-bar'
      placeholder="기재 사항"      
      value = {value.requiredInfo}
      onChange={(e) => {
        setvalue({ ...value, requiredInfo: e })}}
    >
      {children2}
    </Select>

      {/* <Form.Item
        name="radio-button"
        label="신청서 필수 기재 사항"
        value={value.requiredInfo}
        onChange={(e) => {
          setvalue({ ...value, requiredInfo: e.target.value });}}
      >        <Radio.Group>
          <Radio.Button value="성명">성명</Radio.Button>
          <Radio.Button value="성별">성별</Radio.Button>
          <Radio.Button value="나이">나이</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
      <hr />
      <div className='peoplenum-text'>모집 인원</div>
      
        <Form.Item className='peoplenum-bar'
         value={value.peopleNum}
         onChange={(e) => {
           setvalue({ ...value, peopleNum: parseInt(e.target.value) });}}>
          <InputNumber min={1} max={14} />
        </Form.Item>        
        
      
            <hr/>
            
            <div>
            <div className='deadline-text' bordered={false}><img src={vectorimg} />          모집 마감일</div>
      <DatePicker className='deadline-bar' format={dateFormat} onChange={ (date,dateString) => {setvalue({ ...value, deadline: dateString })}}/>
      </div>
          
        </Form>
        
        
       
        <div >
          <Button
            className="regist-button"
            onClick={onSubmit}
          >
            등록
          </Button>
          <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                스터디를 개설하였습니다.
              </Modal>
          <Button
            className="dele-button"
            onClick={onExit}
          >
            취소
          </Button>
        </div>
      </div>
      </div>
      <div id='foot'>
      <Footer/>
      </div>
    </>
  );
}

export default withRouter(PostWrite);
