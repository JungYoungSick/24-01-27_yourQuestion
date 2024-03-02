import { Request, Response } from "express";
import { saveAdminTitle } from "../../../../../../../pages/Component/Src/api/fetch/talkPageFetch/saveAdminTitle";

export const handleSaveAdminTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const title = req.body; // 클라이언트로부터 전달받은 title 추출

    // 관리자 제목을 데이터베이스에 저장하는 로직 구현
    // 예를 들어, MongoDB에 저장하는 함수 adminSaveToMongoDB를 호출
    const saveResult = await saveAdminTitle(title);

    res.status(200).json(saveResult);
  } catch (error) {
    console.error("Error saving admin title to database:", error);
    res.status(500).json({ message: "Error saving admin title", error });
  }
};
