// 토큰으로부터 사용자 정보 추출 (decodeToken)
// 이 함수를 통해 JWT 토큰에서 사용자 정보를 추출하여 사용자 인증 및 권한 부여와 같은 작업에 활용할 수 있습니다.

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
