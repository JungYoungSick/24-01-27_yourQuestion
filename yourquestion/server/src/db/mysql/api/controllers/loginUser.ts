// db/mysql/controllers/loginUser.ts

import { Request, Response } from "express";
import { connectToMysql } from "../../server";
import * as jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const connection = await connectToMysql();

  // 사용자 입력 받기
  const { userID, passWord } = req.body;

  // 사용자 검증 쿼리
  const query = `SELECT * FROM user WHERE userID = ?`;

  try {
    const [rows] = await connection.query<RowDataPacket[]>(query, [userID]);
    const user = rows[0];

    // 비밀번호 검증
    if (user && user.passWord === passWord) {
      // JWT 토큰 생성
      const userPayload = {
        userID: user.userID,
        userName: user.userName,
        userEmail: user.userEmail,
      };
      const JWT_SECRET = "Login"; // 실제 환경에서는 보안을 위해 환경 변수 등으로 관리
      const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "2h" });

      // 로그인 성공 응답
      res.status(200).json({ message: "로그인 완료", token });
    } else {
      // 로그인 실패 응답
      res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error("로그인 처리 중 오류 발생", error);
    res.status(500).json({ message: "로그인 처리 중 오류 발생" });
  }
};
