import React from "react";
import LoginPopup from "../Atoms/button/loginpopup";
import { saveAdminTitle } from "../api/fetch/talkPageFetch/saveAdminTitle";

interface FooterProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserInput: () => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  title: string;
}

const Footer: React.FC<FooterProps> = ({
  handleInputChange,
  handleUserInput,
  setIsPopupOpen,
  inputValue,
  isPopupOpen,
  title,
}) => {
  const handleSaveClick = async () => {
    try {
      await saveAdminTitle(title);
      console.log("Title saved successfully");
    } catch (error) {
      console.error("Error saving title:", error);
    }
  };
  return (
    <footer className="p-4 bg-slate-400">
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
