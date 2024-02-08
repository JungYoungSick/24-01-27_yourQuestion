// pages/auth/reset-password.js
import React, { useState } from "react";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // 비밀번호 재설정 요청을 처리하는 로직을 구현합니다.
    // 예: const response = await fetch('/api/reset-password', { method: 'POST', body: JSON.stringify({ email }) });
    // 결과를 처리하는 로직을 추가합니다.
    alert(`비밀번호 재설정 링크가 ${email} 주소로 전송되었습니다.`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 justify-center items-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            비밀번호 찾기
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                이메일 주소
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="등록한 이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              비밀번호 재설정 링크 보내기
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/auth/login">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              로그인 하러 가기
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
