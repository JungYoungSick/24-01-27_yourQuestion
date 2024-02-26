// 사용자 데이터 조회 (getUserData)

import { Request, Response } from "express";
import { getFromMongoDB } from "./getFromMongoDB";

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query = req.query;
    const result = await getFromMongoDB(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("MongoDB에서 데이터 조회 중 오류 발생:", error);
    res.status(500).json({ message: "MongoDB에서 데이터 조회 중 오류 발생" });
  }
};
