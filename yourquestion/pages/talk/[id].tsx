// pages/talk/[id].tsx
import { useRouter } from "next/router";
import React from "react";
import MainPage from "../index"; // 경로는 실제 구조에 맞게 조정해야 합니다.

const TalkPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // 실제 환경에서는 이 ID를 사용하여 데이터를 조회할 수 있습니다.

  // 여기서는 특정 데이터 로딩 로직을 생략하고, 직접 MainPage를 반환합니다.
  // 데이터가 없을 경우에도 MainPage가 렌더링되도록 합니다.
  // 필요한 경우, 여기서 데이터를 로드하고 그 결과에 따라 MainPage에 props를 전달할 수 있습니다.

  return <MainPage />; // 필요한 props가 있다면 여기에 추가합니다.
};

export default TalkPage;
