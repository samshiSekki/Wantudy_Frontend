import axios from 'axios';

export const postDelete = async (studyId) => {
  await axios.delete(`http://13.209.66.117:8080/studylist/${studyId}`);
};
export const postUpdate = async (updated, studyId) => {
  await axios.put(`http://13.209.66.117:8080/studylist/${studyId}`, updated);
};
export const postSave = async (body) => {
  await axios.post(`http://13.209.66.117:8080/study/`, body);
};