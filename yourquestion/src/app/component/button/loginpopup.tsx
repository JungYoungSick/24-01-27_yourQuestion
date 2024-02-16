import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// 사용자 정보 인터페이스 정의
interface IUser {
  userName: string;
  userEmail: string;
  userID: string;
}

// 토큰에 포함될 정보 인터페이스 정의
interface JwtPayload {
  userName: string;
  userEmail: string;
  userID: string;
  exp: number;
}

const LoginPopup: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState<IUser>({
    userName: "",
    userEmail: "",
    userID: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 로그인 상태를 설정합니다.
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({
            userName: decodedToken.userName,
            userEmail: decodedToken.userEmail,
            userID: decodedToken.userID,
          });
        }
      } catch (error) {
        console.error("토큰 디코드 실패", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃을 진행합니다");
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleLoginClick = () => {
    setIsPopupOpen(true);
  };

  const handleCloseClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <button
        aria-label="로그인"
        className="p-2 bg-purple-200 rounded-full"
        onClick={handleLoginClick}
      >
        👤
      </button>
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-15 flex justify-start items-center"
          onClick={handleCloseClick}
        >
          <div
            className="bg-white w-96 h-3/5 mt-14 mr-10 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoggedIn ? (
              <div className="flex flex-col items-center mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-300 w-16 h-16 rounded-full"></div>
                  <span className="text-lg font-semibold">{user.userName}</span>
                </div>
                <div className="flex flex-col justify-start">
                  <div className="text-sm">아이디: {user.userID}</div>
                  <div className="text-sm mb-4">이메일: {user.userEmail}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center mb-4">
                <span className="text-lg font-semibold">로그인을 하세요</span>
              </div>
            )}
            <div className="w-56 flex justify-between">
              {isLoggedIn ? (
                <Link
                  href="/customer-support"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  고객센터
                </Link>
              ) : (
                // 로그인 상태가 아닐 때 회원가입 링크 클릭 시 confirm 모달 표시
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    const confirmSignUp = window.confirm(
                      "회원가입 페이지로 이동하시겠습니까?"
                    );
                    if (confirmSignUp) {
                      // '예'를 선택했다면 회원가입 페이지로 이동
                      router.push("/login/signup");
                    } else {
                      // '아니오'를 선택했다면 팝업창을 닫음
                      setIsPopupOpen(false);
                    }
                  }}
                >
                  회원가입
                </button>
              )}
              {isLoggedIn ? (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={(e) => {
                    e.preventDefault(); // 기본 링크 이동을 방지
                    handleLogout(); // 로그아웃 처리
                  }}
                >
                  로그아웃하기
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  로그인 페이지로
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;
