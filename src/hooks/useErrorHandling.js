import { message } from 'antd';
import { Redirect, useHistory } from 'react-router';
//CONFLICT, 404 정리 필요. +are
export default function useErrorHandling() {
  const history = useHistory();

  const errorHandling = (error) => {
    switch (error) {
      case 'UNAUTHORIZED': // 비로그인
        history.push('/');
        return message.error('로그인이 필요합니다.');
        break;
      case 'FORBIDDEN_SUSPENSION': // 정지된 사용자
        history.push('/');
        return message.error('정지된 사용자');
        break;
      case 'FORBIDDEN': // 본인이 작성하지 않은 게시글, admin 계정은 허용
        message.error('권한이 없는 사용자입니다.');
        break;
      case 'QUERY_KEYWORD':
        return message.error('두 글자 이상 입력해주세요.');
        break;
      case 'RESOURCE_NOT_FOUND':
        message.error('검색 결과가 존재하지 않습니다.');
        break;
      default:
        message.error('알 수 없는 에러');
        break;
    }
  };

  return errorHandling;
}
