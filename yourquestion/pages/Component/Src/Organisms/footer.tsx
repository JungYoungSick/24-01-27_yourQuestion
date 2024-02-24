import React from "react";
import LoginPopup from "../Atoms/button/loginpopup";

interface FooterProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserInput: () => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({
  inputValue,
  handleInputChange,
  handleUserInput,
  isPopupOpen,
  setIsPopupOpen,
}) => {
  return (
    <footer className="p-4 bg-gray-200">
      <LoginPopup
        showButton={false}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      <div className="flex items-center">
        <input
          type="text"
          placeholder="문구 입력..."
          className="flex-grow p-2 rounded-l text-black"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="p-2 bg-yellow-300 rounded-r"
          onClick={handleUserInput}
        >
          ➡️
        </button>
      </div>
    </footer>
  );
};

export default Footer;
