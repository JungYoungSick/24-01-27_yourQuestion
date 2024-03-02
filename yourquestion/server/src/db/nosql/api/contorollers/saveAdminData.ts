// 관리자 데이터 저장 (saveAdminData)
// 이 함수는 클라이언트로부터 받은 데이터를 MongoDB에 저장하고, 저장 결과를 클라이언트에 반환합니다. 만약 저장 중에 오류가 발생하면 적절한 상태 코드와 함께 오류 메시지를 반환합니다.

import { Request, Response } from "express";
import { adminSaveToMongoDB } from "../contorollers/talk/adminSaveToMongoDB";

export const saveAdminData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const saveResult = await adminSaveToMongoDB(data);
    res.status(200).json(saveResult);
  } catch (error) {
    console.error("Error saving data to admin collection:", error);
    res
      .status(500)
      .json({ message: "Error saving data to admin collection", error });
  }
};
