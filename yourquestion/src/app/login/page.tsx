"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // useRouter 훅 임포트
export default function Login() {
  // useState를 사용하여 사용자 입력을 관리합니다.
  const [userID, setUserID] = useState("");
  const [passWord, setPassWord] = useState("");
  const router = useRouter(); // useRouter 훅 사용
  async function loginUser() {
    try {
      const response = await fetch("/login", {
        // 로그인 API 경로를 올바르게 지정해주세요.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, passWord }),
      });

      const data = await response.json();

      if (data.token) {
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("token", data.token);

        router.push("/");
        console.log("로그인 성공");
        alert("로그인 성공!");
      } else {
        // 에러 처리
        console.error("로그인 실패");
        alert("로그인 실패: 사용자 정보를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생", error);
      alert("로그인 처리 중 오류 발생");
    }
  }

  // 폼 제출을 처리하는 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출의 기본 동작을 방지
    loginUser();
  };

  return (
    <div className="flex min-h-screen bg-gray-50 justify-center items-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="userID" className="sr-only">
                아이디
              </label>
              <input
                id="userID"
                name="userID"
                type="text"
                autoComplete="userID"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="아이디"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            로그인
          </button>
        </form>
        <div className="flex justify-between items-center">
          <div>
            <Link
              href="/login/idfind"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              아이디 찾기
            </Link>
            {" / "}
            <Link
              href="/login/pwfind"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              비밀번호 찾기
            </Link>
          </div>
          <div>
            <Link
              href="/login/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
