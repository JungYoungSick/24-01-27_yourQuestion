// 사용자 인증 상태 관리 커스텀 Hook (useUserAuthentication)

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
