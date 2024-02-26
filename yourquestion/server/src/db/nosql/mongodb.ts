// ## MongoDB 연결 및 라우터 설정

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
// 모든 함수를 하나의 객체로 내보내기
export const mongoControllers = {
  saveUserData: userSave,
  getUserData: userGet,
  searchAdminData: adminSearch,
  saveAdminData: adminSave,
  adminTalkPlus: adminTalk,
  getUserMessages: userMessages,
  getAdminMessages: adminMessages,
};
