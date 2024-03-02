// ## MongoDB 연결 및 라우터 설정
// 이렇게 하면 모든 MongoDB 관련 함수를 단일한 객체로 관리할 수 있습니다. 이러한 모듈화된 접근 방식은 코드의 가독성을 높이고 유지보수를 용이하게 만듭니다. 이제 mongoControllers 객체를 사용하여 다른 파일에서 MongoDB 함수들을 쉽게 가져와 사용할 수 있습니다.

// 사용자 데이터 저장 함수
import { saveUserData as userSave } from "../nosql/api/contorollers/saveUserData";
// 사용자 데이터 조회 함수
import { getUserData as userGet } from "./api/contorollers/talkList/getUserData";
// 관리자 데이터 검색 함수
import { searchAdminData as adminSearch } from "../nosql/api/contorollers/talk/searchAdminData";
// 관리자 데이터 저장 함수
import { saveAdminData as adminSave } from "../nosql/api/contorollers/saveAdminData";
// 추가 관리자 데이터 저장 함수
import { adminTalkPlus as adminTalk } from "./api/contorollers/newTogle/adminTalkPlus/adminTalkPlus";

import { getUserMessages as userMessages } from "./api/contorollers/talkMessages/userMessages";
import { getAdminMessages as adminMessages } from "./api/contorollers/talkMessages/adminMessages";
import { handleSaveAdminTitle as handleSaveAdminTitle } from "./api/contorollers/talk/adminSaveTitle";
// 모든 함수를 하나의 객체로 내보내기
export const mongoControllers = {
  saveUserData: userSave,
  getUserData: userGet,
  searchAdminData: adminSearch,
  saveAdminData: adminSave,
  adminTalkPlus: adminTalk,
  getUserMessages: userMessages,
  getAdminMessages: adminMessages,
  handleSaveAdminTitle: handleSaveAdminTitle,
};
