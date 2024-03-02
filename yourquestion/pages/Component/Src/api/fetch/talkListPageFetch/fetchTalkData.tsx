// 토크 데이터 가져오기 (fetchTalkData)
// 함수는 비동기로 구현되어 있으며, axios.get을 사용하여 HTTP GET 요청을 보냅니다. 요청이 성공하면 응답 데이터를 반환하고, 요청이 실패하면 에러를 콘솔에 출력하고 빈 배열을 반환합니다.
import axios from "axios";
import { Talk } from "../../../interface/talk";

export const fetchTalkData = async (userID: string): Promise<Talk[]> => {
  try {
    const response = await axios.get(`/talkData/${userID}`);
    console.log(response.data);
    return response.data.title;
  } catch (error) {
    console.error("talkdata를 불러오는데 실패했습니다.", error);
    return [];
  }
};
