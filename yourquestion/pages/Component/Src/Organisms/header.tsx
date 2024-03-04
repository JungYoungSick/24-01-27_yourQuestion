import React from "react";
import LoginPopup from "../Atoms/button/loginpopup";
import NewTalk from "../Atoms/button/newtalk";
import TalkList from "../Atoms/button/talklist";
import Talk from "../Atoms/button/talk";

interface TalkProps {
  title: string; // title을 prop으로 받음
}

const Header: React.FC<TalkProps> = ({ title }) => {
  return (
    <header className="flex justify-between p-4">
      <div className="flex space-x-4">
        <LoginPopup />
      </div>
      <div className="flex space-x-2">
        <NewTalk />
        <TalkList />
        <Talk title={title} />
      </div>
    </header>
  );
};

export default Header;
