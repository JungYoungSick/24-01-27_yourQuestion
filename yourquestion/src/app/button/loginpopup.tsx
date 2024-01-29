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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button onClick={handleCloseClick}>📌</button>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-300 w-12 h-12 rounded-full mb-4"></div>
              <div className="text-lg">닉네임</div>
              <div className="text-sm">이름: OOO</div>
              <div className="text-sm">아이디: OOO@gmail.com</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;
