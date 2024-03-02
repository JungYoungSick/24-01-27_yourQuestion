// 관리자 대화 저장 (adminTalkPlus)
// 이 함수는 클라이언트로부터 받은 토큰을 사용하여 관리자가 제공한 데이터를 저장하고, 그 결과를 클라이언트에 반환합니다. 토큰이 제공되지 않았거나 데이터 저장 중에 오류가 발생한 경우에는 적절한 상태 코드와 함께 오류 메시지를 반환합니다.

import { Request, Response } from "express";
import { AdminSavaData } from "./AdminSaveData";

export const adminTalkPlus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const encodedToken = req.headers.authorization?.split(" ")[1];
    if (!encodedToken) {
      res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
      return;
    }

    // URL 디코딩
    const decodedTokenString = decodeURIComponent(encodedToken);
    // JSON 파싱
    const tokenObj = JSON.parse(decodedTokenString);
    // 실제 토큰 추출
    const token = tokenObj.token;

    const result = await AdminSavaData(token, data);
    res.status(200).json({
      message: "Admin data saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error saving admin data:", error);
    res.status(500).json({
      message: "Error saving admin data",
      error,
    });
  }
};
