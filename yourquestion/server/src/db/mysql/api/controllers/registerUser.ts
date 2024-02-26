// db/mysql/controllers/registerUser.ts

import { Request, Response } from "express";
import { connectToMysql } from "../../server";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const connection = await connectToMysql();

  // 사용자 입력 받기
  const { userName, userID, passWord, userEmail, phoneNumber } = req.body;

  // 고유 ID 생성
  const productKey = uuidv4();

  // 사용자 등록 쿼리
  const query = `
    INSERT INTO user (productKey, userName, userID, passWord, userEmail, phoneNumber, addDate)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  try {
    await connection.query(query, [
      productKey,
      userName,
      userID,
      passWord,
      userEmail,
      phoneNumber,
    ]);

    // 회원가입 성공 응답
    res.status(200).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 처리 중 오류 발생:", error);
    res.status(500).json({ message: "회원가입 처리 중 오류 발생", error });
  }
};
