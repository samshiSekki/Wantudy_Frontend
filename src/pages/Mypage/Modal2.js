import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {message} from 'antd';
const Modal2 = ({modalClose,history,userId,studyId,assignmentId}) => {
  console.log(assignmentId)

    const [next, setNext] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [checkedInputs, setCheckedInputs] = useState([]);
    const [whoDidAs, setWhoDidAs] = useState();
    useEffect(()=>{
      axios.get(`http://13.209.66.117:8080/users/${userId}/ongoing-studylist/${studyId}/showAssignment/${assignmentId}`, {
        params: {
          userId:userId,
          studyId:studyId,
          assignmentId:assignmentId
        }
      })
      .then(res =>{setWhoDidAs(res.data.assignedMember)})
      .catch(err => console.log(err));
    },[])
    console.log(whoDidAs)

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

    }
    const onCountPositive = () =>{
        positive+=1;

    }
    const onCountNegative = () =>{
        negative+=1;

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
            <div className="modal" style={{height:'450px'}}>

               <div className="passion-title">과제 완료 스터디원 조회</div>
               <div>스터디원 본인의 과제 수행 체크박스에</div>
               <div>체크한 스터디원 기준입니다.</div>
               <div style={{fontSize:'15px',color:'blue',marginTop:'30px'}}>말랑이</div>
               <button className="modal__button_delete" style={{marginLeft:'120px'}}onClick={modalClose}>확인</button>



                
            </div>
        </div>
    )

}

export default Modal2;