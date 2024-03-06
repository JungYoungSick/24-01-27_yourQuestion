import axios from "axios";

const deleteTitleFromDB = async (title: string): Promise<void> => {
  try {
    // 여기에 백엔드 API의 엔드포인트를 호출하여 title을 삭제하는 코드 작성
    // 예시:
    await axios.delete(`/talkList/delite/${title}`);
    // 삭제 요청이 성공하면 그대로 반환
    // 만약 백엔드에서 삭제 요청이 실패하면, 예외를 던져서 호출자에게 알려줌
  } catch (error) {
    // 삭제 요청이 실패한 경우 예외 처리
    throw new Error("Error deleting title from database");
  }
};

export default deleteTitleFromDB;
