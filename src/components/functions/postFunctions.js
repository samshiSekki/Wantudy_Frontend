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
export const postScrap = async (studyId, body) => {
  await axios.post(`http://13.209.66.117:8080/studylist/${studyId}`, body, {
    params: { studyId: studyId },
  });
};
export const registerPost = async (studyId,body) => {
  await axios.post(`http://13.209.66.117:8080/study/${studyId}/application`, body,{
    params:{studyId:studyId}
  });
};
export const postScrapDelete = async (studyId,body) => {
  await axios.delete(`http://13.209.66.117:8080/studylist/${studyId}/cancel-like`,body,{
    params:{studyId:studyId},
  });
};