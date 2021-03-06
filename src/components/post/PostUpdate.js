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
      message.success('????????? ?????? ??????');
      props.history.goBack();
    })
    .catch((error) => {
      errorHandling(error.response?.data.message);
    });
  };
  const onExit = () => {
    const answer = window.confirm(
      '???????????? ?????? ???????????? ????????????. ????????? ??????????????????????',
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


  const children = [];
for (let i = 0; i < 9; i++) {
  if (i == 0) {
    children.push(<Option key={'?????? / ???????????????'}>{'?????? / ???????????????'}</Option>);

  }
  else if (i == 1) {
    children.push(<Option key={'?????????'}>{'?????????'}</Option>);

  }
  else if (i == 2) {
    children.push(<Option key={'??????'}>{'??????'}</Option>);

  }
  else if (i == 3) {
    children.push(<Option key={'????????? ??????'}>{'????????? ??????'}</Option>);
    
  }
  else if (i == 4) {
    children.push(<Option key={'????????????'}>{'????????????'}</Option>);
    
  }
  else if (i == 5) {
    children.push(<Option key={'????????? ?????????'}>{'????????? ?????????'}</Option>);
    
  }
  else if (i == 6) {
    children.push(<Option key={'?????????'}>{'?????????'}</Option>);
    
  }
  else if (i == 7) {
    children.push(<Option key={'??????'}>{'??????'}</Option>);
    
  }
  else if (i == 8) {
    children.push(<Option key={'??????'}>{'??????'}</Option>);
    
  }
  else if (i == 9) {
    children.push(<Option key={'?????? ??????'}>{'?????? ??????'}</Option>);
    
  }
  
}
const children2 = [];
for (let i = 0; i < 10; i++) {
  if (i == 0) {
    children2.push(<Option key={'??????'}>{'??????'}</Option>);

  }
  else if (i == 1) {
    children2.push(<Option key={'??????'}>{'??????'}</Option>);

  }
  else if (i == 2) {
    children2.push(<Option key={'??????'}>{'??????'}</Option>);

  }
  else if (i == 3) {
    children2.push(<Option key={'??????'}>{'??????'}</Option>);
    
  }
  else if (i == 4) {
    children2.push(<Option key={'??????'}>{'??????'}</Option>);
    
  }
  else if (i == 5) {
    children2.push(<Option key={'?????? ??????'}>{'?????? ??????'}</Option>);
    
  }
  else if (i == 6) {
    children2.push(<Option key={'?????????'}>{'?????????'}</Option>);
    
  }
  else if (i == 7) {
    children2.push(<Option key={'?????? ??????'}>{'?????? ??????'}</Option>);
    
  }
  else if (i == 8) {
    children2.push(<Option key={'????????? ???????????? keyword'}>{'????????? ???????????? keyword'}</Option>);
    
  }
  else if (i == 9) {
    children2.push(<Option key={'?????? ??????'}>{'?????? ??????'}</Option>);
    
  }
  
}
const plainOptions = ['????????????', '?????????'];

  return (
    <>
     <div className='post-write-box'>
            <div><div style={{float:'left'}}>???????????? : &nbsp;</div>
      <Input
          className="title-bar"
          type="text"
          placeholder="????????????"
          style={{ width: '80%' }}
          value={updated.studyName}
          onChange={(e) => {
            setUpdated({ ...updated, studyName: e.target.value });
          }}
        />
        <hr />
        <div style={{float:'left'}}>?????? : &nbsp;</div><Select
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
          placeholder="??????"
          value={value.category}
          onChange={(e) => {
            setvalue({ ...value, category: e.target.value });
          }}
        /> */}
        <hr />
        <div style={{float:'left'}}>?????? ?????? : &nbsp;</div>
        <Input
          className="title-bar"
          style={{width:'80%'}}
          type="text"
          placeholder="?????? ??????"
          value={updated.description}
          onChange={(e) => {
            setUpdated({ ...updated, description: e.target.value });
          }}
        />
        <hr />
        <div style={{float:'left'}}>????????? : &nbsp;</div>
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
    > <div style={{float:'left'}}>?????? ?????? : &nbsp;</div> 
      <Checkbox.Group options={plainOptions} value = {updated.onoff} onChange={(e) => {
        setUpdated({ ...updated, onoff: e })}}/>
          {/* <Form.Item
        name="radio-button"
        label="?????? ??????"
        value={value.onoff}
          onChange={(e) => {
            setvalue({ ...value, onoff: e.target.value });}}
      >        <Radio.Group>
          <Radio.Button value="?????????">?????????</Radio.Button>
          <Radio.Button value="????????????">????????????</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
      <hr />
      <div style={{float:'left'}}>?????? ????????? : &nbsp;</div> <Select mode="tags" style={{ width: '80%' }} placeholder="????????? ???????????? ????????? ?????? ????????? ???????????????!" onChange={(e) => {
          setUpdated({ ...updated, studyTime: e });}}>
  </Select>
{/* 
      <Form.Item
        name="radio-button"
        label="?????? ?????????"
        value={value.studyTime}
        onChange={(e) => {
          setvalue({ ...value, studyTime: e.target.value });}}
      >        <Radio.Group>
          <Radio.Button value="??? 13-15">??? 13-15</Radio.Button>
          <Radio.Button value="??? 15-17">??? 15-17</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
      <hr />
      <div style={{float:'left'}}>????????? ?????? ?????? ?????? : &nbsp;</div>
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
        label="????????? ?????? ?????? ??????"
        value={value.requiredInfo}
        onChange={(e) => {
          setvalue({ ...value, requiredInfo: e.target.value });}}
      >        <Radio.Group>
          <Radio.Button value="??????">??????</Radio.Button>
          <Radio.Button value="??????">??????</Radio.Button>
          <Radio.Button value="??????">??????</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
      <hr />
      <Form.Item label="?????? ??????">
        <Form.Item name="?????? ??????"
         value={updated.peopleNum}
         onChange={(e) => {
            setUpdated({ ...updated, peopleNum: parseInt(e.target.value) });}}>
          <InputNumber min={1} max={14} />
        </Form.Item>        
        
      
            </Form.Item>
            <Form.Item label="??????">
        <Form.Item name="??????"
         value={updated.period}
         onChange={(e) => {
            setUpdated({ ...updated, period: parseInt(e.target.value) });}}>
          <InputNumber min={1} max={14} />
        </Form.Item>        
        
      
            </Form.Item>
            <div>
            <div style={{float:'left'}} bordered={false}>?????? ?????? ?????? : &nbsp;</div>
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
            ??????
          </Button>
          <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                 ???????????? ?????????????????????.
              </Modal>
          <Button
            type="primary"
            onClick={onExit}
            style={{
              marginLeft: '10px',
            }}
          >
            ??????
          </Button>
        </div>
      </div>
      </div>
    </>
  );
}

export default withRouter(PostUpdate);
