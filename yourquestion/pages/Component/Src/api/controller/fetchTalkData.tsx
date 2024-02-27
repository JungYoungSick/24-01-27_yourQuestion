// 토크 데이터 가져오기 (fetchTalkData)
import axios from "axios";
import { Talk } from "../../interface/talk";

export const fetchTalkData = async (): Promise<Talk[]> => {
  try {
    const response = await axios.get("/title/talkdata");
    return response.data;
  } catch (error) {
    console.error("talkdata를 불러오는데 실패했습니다.", error);
    return [];
  }
};
