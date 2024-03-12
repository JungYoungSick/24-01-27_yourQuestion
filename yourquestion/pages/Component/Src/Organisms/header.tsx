import React from "react";
import LoginPopup from "../Molecules/loginpopup";
import NewTalk from "../Molecules/newtalk";
import TalkList from "../Molecules/talklist";
import Talk from "../Molecules/talk";

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
