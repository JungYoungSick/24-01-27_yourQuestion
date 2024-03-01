// 관리자 대화 저장 (adminTalkPlus)

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
