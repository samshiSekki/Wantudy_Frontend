import React, { useRef, useState,useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { withRouter } from 'react-router-dom';
import { postSave } from '../functions/postFunctions';
import { Button, Input, message, Select, Form,Radio, InputNumber,Modal, DatePicker, Checkbox, Divider } from 'antd';
import useErrorHandling from '../../hooks/useErrorHandling';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from 'axios'
import {postUpdate} from '../functions/postFunctions';
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
const {RangePicker} = DatePicker;


function PostUpdate(props) {
  const { Option } = Select;
  const dateFormat = "YYYY-MM-DD";
  const today = moment();
  const StudyId = props.match.params.id
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const errorHandling = useErrorHandling();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [postDetail,setPostDetail] = useState([]);
  const [updated, setUpdated] = useState(false);
  

  

    useEffect(() => {
        axios.get(`http://13.209.66.117:8080/studylist/${StudyId}`, {
      params: {
        studyId : StudyId
      }
    })
    .then(res =>setPostDetail(res.data.data))
    .catch(err => console.log(err));
    console.log(postDetail)
          setUpdated({
        studyName:postDetail.studyName, 
        category:postDetail.category, 
        description:postDetail.description,
        onoff:postDetail.onoff,
        studyTime:postDetail.studyTime,
        peopleNum:postDetail.peopleNum,
        requiredInfo:postDetail.requiredInfo,
        deadline:postDetail.deadline,
        period:postDetail.period,
          });
        
      }, []);


  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    setUpdated({ ...updated, requiredInfo: list })
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onSubmit = (e) => {
    postUpdate(updated, props.match.params.id)
    .then(() => {
      message.success('게시글 수정 완료');
      props.history.goBack();
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
for (let i = 0; i < 9; i++) {
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
const plainOptions = ['오프라인', '온라인'];

  return (
    <>
     <div className='post-write-box'>
            <div><div style={{float:'left'}}>스터디명 : &nbsp;</div>
      <Input
          className="title-bar"
          type="text"
          placeholder="스터디명"
          style={{ width: '80%' }}
          value={updated.studyName}
          onChange={(e) => {
            setUpdated({ ...updated, studyName: e.target.value });
          }}
        />
        <hr />
        <div style={{float:'left'}}>분야 : &nbsp;</div><Select
      mode="multiple"
      style={{ width: '80%' }}
      placeholder="Please select"      
      value = {updated.category}
      defaultValue= {null}
      onChange={(e) => {
        setUpdated({ ...updated, category: e })}}
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
        <div style={{float:'left'}}>상세 설명 : &nbsp;</div>
        <Input
          className="title-bar"
          style={{width:'80%'}}
          type="text"
          placeholder="상세 설명"
          value={updated.description}
          onChange={(e) => {
            setUpdated({ ...updated, description: e.target.value });
          }}
        />
        <hr />
        <div style={{float:'left'}}>난이도 : &nbsp;</div>
        <Input
          className="title-bar"
          style={{width:'80%'}}
          type="text"
          placeholder="level"
          value={updated.level}
          onChange={(e) => {
            setUpdated({ ...updated, level: e.target.value });
          }}
        />
      <Form
      name="validate_other"
    > <div style={{float:'left'}}>진행 방식 : &nbsp;</div> 
      <Checkbox.Group options={plainOptions} value = {updated.onoff} onChange={(e) => {
        setUpdated({ ...updated, onoff: e })}}/>
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
      <div style={{float:'left'}}>희망 시간대 : &nbsp;</div> <Select mode="tags" style={{ width: '80%' }} placeholder="원하는 시간대를 입력한 다음 엔터를 눌러주세요!" onChange={(e) => {
          setUpdated({ ...updated, studyTime: e });}}>
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
      <div style={{float:'left'}}>신청서 필수 기재 사항 : &nbsp;</div>
      {/* <Checkbox.Group options={plainOptions} value = {value.requiredInfo} onChange={(e) => {
        setvalue({ ...value, requiredInfo: e })}}/> */}
      <Select
      mode="multiple"
      allowClear
      style={{ width: '80%' }}
      placeholder="Please select"      
      value = {updated.requiredInfo}
      onChange={(e) => {
        setUpdated({ ...updated, requiredInfo: e })}}
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
      <Form.Item label="모집 인원">
        <Form.Item name="모집 인원"
         value={updated.peopleNum}
         onChange={(e) => {
            setUpdated({ ...updated, peopleNum: parseInt(e.target.value) });}}>
          <InputNumber min={1} max={14} />
        </Form.Item>        
        
      
            </Form.Item>
            <Form.Item label="기간">
        <Form.Item name="기간"
         value={updated.period}
         onChange={(e) => {
            setUpdated({ ...updated, period: parseInt(e.target.value) });}}>
          <InputNumber min={1} max={14} />
        </Form.Item>        
        
      
            </Form.Item>
            <div>
            <div style={{float:'left'}} bordered={false}>모집 마감 기한 : &nbsp;</div>
      <DatePicker format={dateFormat} onChange={ (date,dateString) => {setUpdated({ ...updated, deadline: dateString })}}/>
      </div>
          
        </Form>
        
        
       
        <div id="button-bar">
          <Button
            type="primary"
            onClick={onSubmit}
            style={{
              marginLeft: '10px',
            }}
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
            type="primary"
            onClick={onExit}
            style={{
              marginLeft: '10px',
            }}
          >
            취소
          </Button>
        </div>
      </div>
      </div>
    </>
  );
}

export default withRouter(PostUpdate);
