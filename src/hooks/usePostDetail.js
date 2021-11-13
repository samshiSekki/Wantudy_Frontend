import axios from 'axios';
import useSWR from 'swr';

export default function usePostDetail(studyId) {
  const fetcher = (url) =>
    axios.get(url).then((response) => response.data);

  const { data, error } = useSWR(`http://13.209.66.117:8080/studylist/${studyId}`, fetcher);


  return {

    postDetail: data,
    isLoading: !error && !data,
    isError: error,
  };
}
