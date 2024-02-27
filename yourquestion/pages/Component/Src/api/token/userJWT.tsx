// 토큰으로부터 사용자 정보 추출 (decodeToken)

import { jwtDecode } from "jwt-decode";
import { JwtPayload, IUser } from "../../interface/login";

export const decodeToken = (token: string): IUser | null => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken.exp * 1000 > Date.now()) {
      return {
        userName: decodedToken.userName,
        userEmail: decodedToken.userEmail,
        userID: decodedToken.userID,
      };
    }
  } catch (error) {
    console.error("토큰 디코드 실패", error);
    return null;
  }
  return null;
};
