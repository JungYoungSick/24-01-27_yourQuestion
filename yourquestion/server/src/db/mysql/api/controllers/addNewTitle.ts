// db/mysql/controllers/addNewTitle.ts

import { Request, Response } from "express";
import { connectToMysql } from "../../server";

export const addNewTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  // MariaDB 연결 시도
  const connection = await connectToMysql();

  // 연결 실패 시 오류 응답
  if (!connection) {
    res.status(500).json({ message: "MariaDB 타이틀 전송 실패" });
    return;
  }

  // 요청 본문에서 userID와 title 추출
  const { userID, title } = req.body;

  // 새로운 타이틀을 talkdata 테이블에 추가하는 쿼리
  const query = "INSERT INTO talkdata (userID, title) VALUES (?, ?)";

  try {
    // 쿼리 실행
    const [result] = await connection.query(query, [userID, title]);

    // 성공 응답 반환
    res.json({
      success: true,
      message: "Title added successfully",
      result,
      Id: title,
    });
  } catch (err) {
    // 쿼리 실행 중 오류 발생 시
    console.error("Error adding title:", err);
    res.status(500).send({ success: false, message: "Error adding title" });
  }
};
