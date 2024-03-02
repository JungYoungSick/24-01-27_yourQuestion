// 사용자 인증 상태 관리 커스텀 Hook (useUserAuthentication)
// 이렇게 함으로써 useUserAuthentication 훅은 애플리케이션의 다른 부분에서 사용자의 로그인 상태를 확인하고, 필요한 경우 사용자 정보를 제공할 수 있습니다.

import { useState, useEffect } from "react";
import { decodeToken } from "./userJWT";
import { IUser } from "../../interface/login";

const useUserAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>({
    userName: "",
    userEmail: "",
    userID: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      const user = decodeToken(token);
      if (user) {
        setUser(user);
      }
    }
  }, []);

  return { isLoggedIn, user, setIsLoggedIn };
};

export default useUserAuthentication;
