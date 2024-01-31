"use client";
import React, { useState } from "react";

const LoginPopup: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsPopupOpen(true);
  };

  const handleCloseClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <button
        className="p-2 bg-blue-200 rounded-full"
        onClick={handleLoginClick}
      >
        👤
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-15 flex justify-start items-center">
          <div className="bg-white w-96 h-3/5 mt-14 mr-10 rounded-lg shadow-xl">
            <div
              className="w-11/12 h-16
            flex justify-end items-center"
            >
              <button onClick={handleCloseClick}>📌</button>
            </div>
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-300 w-16 h-16 rounded-full"></div>
                <span className="text-lg font-semibold">닉네임</span>
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-sm">이름: OOO</div>
                <div className="text-sm mb-4">아이디: OOO@gmail.com</div>
              </div>
              <div className="w-56 flex justify-between">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  고객센터
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;
