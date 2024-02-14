"use client";
// 필요한 타입 정의
type FormData = {
  userName: string;
  userID: string;
  passWord: string;
  userEmail: string;
  phoneNumber: string;
};

// React와 Next.js의 필요한 훅과 컴포넌트를 import
import React, { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import Modal from "@app/component/signupModal"; // Modal 컴포넌트의 경로가 올바른지 확인하세요
import { useRouter } from "next/navigation";

export default function Register() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    userID: "",
    passWord: "",
    userEmail: "",
    phoneNumber: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/mysql/mariadb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 justify-center items-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                이름
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="name"
                value={formData.userName}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-1"
                placeholder="이름"
              />
            </div>
            <div>
              <label htmlFor="userID" className="sr-only">
                아이디
              </label>
              <input
                id="userID"
                name="userID"
                type="text"
                autoComplete="email"
                value={formData.userID}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-1"
                placeholder="아이디"
              />
            </div>
            <div>
              <label htmlFor="passWord" className="sr-only">
                비밀번호
              </label>
              <input
                id="passWord"
                name="passWord"
                type="password"
                autoComplete="new-password"
                value={formData.passWord}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-1"
                placeholder="비밀번호"
              />
            </div>
            {/* <div>
              <label htmlFor="password-confirm" className="sr-only">
                비밀번호 확인
              </label>
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-1"
                placeholder="비밀번호 확인"
              />
            </div> */}
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                전화번호
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="new-phone"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-1"
                placeholder="전화번호"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                이메일 주소
              </label>
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                autoComplete="email"
                value={formData.userEmail}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-b-md"
                placeholder="이메일 주소"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              회원가입
            </button>
          </div>
        </form>
        <Modal isOpen={showModal} onClose={handleModalClose}>
          회원가입이 성공적으로 완료되었습니다!
        </Modal>
        <div className="text-sm text-center">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
