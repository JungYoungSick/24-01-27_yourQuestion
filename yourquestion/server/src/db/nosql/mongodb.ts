// db/nosql/mongodb.ts

// 각 컨트롤러 함수 파일의 경로는 실제 프로젝트 구조에 맞게 조정해야 합니다.

// 사용자 데이터 저장 함수
import { saveUserData as userSave } from "../nosql/api/contorollers/saveUserData";
// 사용자 데이터 조회 함수
import { getUserData as userGet } from "../nosql/api/contorollers/getUserData";
// 관리자 데이터 검색 함수
import { searchAdminData as adminSearch } from "../nosql/api/contorollers/talk/searchAdminData";
// 관리자 데이터 저장 함수
import { saveAdminData as adminSave } from "../nosql/api/contorollers/saveAdminData";
// 추가 관리자 데이터 저장 함수
import { adminTalkPlus as adminTalk } from "./api/contorollers/adminTalkPlus";

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
