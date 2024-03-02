// 사용자 데이터 조회 (getUserData)
// 이 함수는 클라이언트로부터 받은 쿼리를 사용하여 MongoDB에서 사용자 데이터를 조회하고, 조회 결과를 클라이언트에 반환합니다. 만약 조회 중에 오류가 발생하면 적절한 상태 코드와 함께 오류 메시지를 반환합니다.

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
