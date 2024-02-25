import React, { useState } from "react";
import Header from "./Component/Src/Organisms/header";
import Main from "./Component/Src/Organisms/main";
import Footer from "./Component/Src/Organisms/footer";
import { saveUserInput as saveUserInputUtil } from "../Server/Src/utils/mainPage/saveUserInput";
import { handleSubmit as handleSubmitUtil } from "../Server/Src/utils/mainPage/handleSubmit";
import { saveSearchResultToAdmin } from "../Server/Src/utils/mainPage/saveSearchResultToAdmin";
import { handleUserInput as handleUserInputUtil } from "./Component/Src/Molecules/handleUserInput";
import { handleInputChange as handleInputChangeUtil } from "./Component/Src/Molecules/handleInputChange";

const MainPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [adminData, setAdminData] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 입력값 변경 처리 함수
  const customHandleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChangeUtil(event, setInputValue);
  };

  // 사용자 입력 처리 함수
  const customHandleUserInput = async () => {
    await handleUserInputUtil(setIsPopupOpen, () =>
      handleSubmitUtil(
        inputValue,
        setAdminData,
        saveSearchResultToAdmin,
        saveUserInputUtil
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-pink-100">
      <Header />
      <Main adminData={adminData} />
      <Footer
        inputValue={inputValue}
        handleInputChange={customHandleInputChange}
        handleUserInput={customHandleUserInput}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />
    </div>
  );
};

export default MainPage;
