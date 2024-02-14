"use client";
import React from "react";

// Modal 컴포넌트의 Props에 대한 인터페이스 정의
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        {children}
        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
