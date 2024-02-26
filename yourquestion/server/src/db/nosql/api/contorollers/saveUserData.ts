// 사용자 데이터 저장 (saveUserData)

import { Request, Response } from "express";
import { userSaveToMongoDB } from "../contorollers/talk/userSaveToMongoDB";

export const saveUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const saveResult = await userSaveToMongoDB(data);
    res.status(200).json(saveResult);
  } catch (error) {
    console.error("MongoDB에 데이터 저장 중 오류 발생:", error);
    res
      .status(500)
      .json({ message: "MongoDB에 데이터 저장 중 오류 발생", error });
  }
};
