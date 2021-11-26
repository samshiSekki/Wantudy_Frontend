import React,{useState} from 'react';
import vector from './Vector.png'
import axios from 'axios';
import {message} from 'antd';
const Modal = ({modalClose, userId, memberId,history,ongoingStudy}) => {

    const [next, setNext] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [checkedInputs, setCheckedInputs] = useState([]);
    console.log(ongoingStudy.studyState)

    const changeHandler = (checked, id) => {
      if (checked) {
        setCheckedInputs([...checkedInputs, id]);
      } else {
        // 체크 해제
        setCheckedInputs(checkedInputs.filter((el) => el !== id));
      }
    };
    var positive = 0;
    var negative = 0;

    const onNextModal = () => {
        const checkboxes = document.getElementsByName('text');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  })
        setIsVisible(false);
        console.log(userId, memberId)

    }
    const onCountPositive = () =>{
        positive+=1;

    }
    const onCountNegative = () =>{
        negative+=1;

    }
    const onFinishModal = () => {

axios.put(`http://13.209.66.117:8080/users/${userId}/ongoing-studylist/passion-test/${memberId}`, {
    positive: positive,
    negative: negative
  })
  .then(function (response) {
    modalClose();
    message.success('평가 완료');
      history.goBack();
      ongoingStudy.studyState = 1


  })
  .catch(function (error) {
    console.log(error);
  });
    }


    const onCloseModal = (e) => {
        console.log('e.target: ', e.target)
        console.log('e.tarcurrentTargetget: ', e.currentTarget)
        if(e.target === e.currentTarget){
            modalClose()
        }

    }
    return (
        <div className="modal__container" onClick={onCloseModal}>
            <div className="modal">
                {isVisible ? (<><div className="passion-title"><span style={{color:'#497EF1'}}>[{ongoingStudy.participants[0].nickname}] </span><span>열정 평가</span></div>
                <div style={{marginBottom:'45px'}}>다음 항목은 하나 당 1°C가 올라갑니다.</div>
                <div className="text1"><input name='text' type="checkbox" onClick={onCountPositive}></input><label>시간을 잘 지킨다</label></div>
                <div className="text2"><input name='text' type="checkbox" onClick={onCountPositive}></input><label>결석이 전혀 없다</label></div>
                <div className="text3"><input name='text' type="checkbox" onClick={onCountPositive}></input><label>스터디에 열정적으로 참여한다</label></div>
                <div className="text4"><input name='text' type="checkbox" onClick={onCountPositive}></input><label>과제 수행률이 높다</label></div>
                <div className="text5"><input name='text' type="checkbox" onClick={onCountPositive}></input><label>좋은 정보를 잘 공유해준다</label></div>
                <div className="text6"><input name='text' type="checkbox" onClick={onCountPositive}></input><label>다음에도 함께 하고 싶은 스터디원이다</label></div>
                <button className="modal__button_delete" onClick={modalClose}>취소</button>
                <button className="modal__button_next" onClick={onNextModal}>다음</button></>)
                :<><img style={{marginTop:'-150px', marginLeft:'-600px'}} onClick={()=>{setIsVisible(true)}} src={vector}/><div className="passion-title"><span style={{color:'#497EF1'}}>[{ongoingStudy.participants[0].nickname}] </span><span>열정 평가</span></div>
                <div style={{marginBottom:'45px'}}>다음 항목은 하나 당 1°C가 내려갑니다.</div>
                <div className="text7"><input type="checkbox" onClick={onCountNegative}></input><label>시간을 잘 지키지 않는다</label></div>
                <div className="text8"><input type="checkbox" onClick={onCountNegative}></input><label>결석이 잦다</label></div>
                <div className="text9"><input type="checkbox" onClick={onCountNegative}></input><label>스터디에 열정적으로 참여하지 않는다</label></div>
                <div className="text10"><input type="checkbox" onClick={onCountNegative}></input><label>정보를 공유하지 않고 받기만 한다</label></div>
                <div className="text11"><input type="checkbox" onClick={onCountNegative}></input><label>다시 함께 하고 싶지 않은 스터디원이다</label></div>
                <button className="modal__button_delete" style={{marginTop:'80px'}} onClick={modalClose}>취소</button>
                <button className="modal__button_next" style={{backgroundColor:'#497EF1',color:'white'}} onClick={onFinishModal}>완료</button>
                </>}
                
            </div>
        </div>
    )
}

export default Modal;