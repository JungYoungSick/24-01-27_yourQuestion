"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// 사용자 정보 인터페이스 정의
interface IUser {
  userName: string;
  userEmail: string;
  userID: string; // 실제 토큰에 저장된 키 이름에 따라 변경할 수 있습니다.
}

// 토큰에 포함될 정보 인터페이스 정의
interface JwtPayload {
  userName: string;
  userEmail: string;
  userID: string; // 이 부분도 토큰에 저장된 키 이름에 따라 변경해야 할 수 있습니다.
  exp: number;
}
const LoginPopup: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState<IUser>({
    userName: "",
    userEmail: "",
    userID: "",
  });
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
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

  // 로그아웃 핸들러 함수
  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    router.push("/"); // 메인 페이지로 리다이렉트
  };

  const handleLoginClick = () => {
    setIsPopupOpen(true);
  };

  const handleCloseClick = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const closeOnEscape = (e: any) => {
      if (e.key === "Escape") {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

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
            <div
              className="w-11/12 h-16
            flex justify-end items-center"
            >
              <button onClick={handleCloseClick} aria-label="닫기">
                📌
              </button>
            </div>
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-300 w-16 h-16 rounded-full"></div>
                <span className="text-lg font-semibold">
                  {user.userName}
                </span>{" "}
                {/* 닉네임 부분에 이름 표시 */}
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-sm">아이디: {user.userID}</div>{" "}
                {/* 아이디 부분에 아이디 표시 */}
                <div className="text-sm mb-4">
                  이메일: {user.userEmail}
                </div>{" "}
                {/* 이메일 부분에 이메일 표시 */}
              </div>
              <div className="w-56 flex justify-between">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  고객센터
                </button>
                {localStorage.getItem("token") ? (
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={handleLogout} // 로그아웃 핸들러 함수 호출
                  >
                    로그아웃하기
                  </button>
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
        </div>
      )}
    </>
  );
};

export default LoginPopup;
