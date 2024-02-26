// mariaDbHandlers.ts

import { Request, Response } from "express";
import { connectToMysql } from "./server";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { RowDataPacket } from "mysql2";

export const loginUser = async (req: Request, res: Response) => {
  const connection = await connectToMysql();
  if (!connection) {
    res.status(500).json({ message: "MariaDB 연결 실패" });
    return;
  }

  const { userID, passWord } = req.body;
  const query = `SELECT * FROM user WHERE userID = ?`;

  try {
    const [rows] = await connection
      .promise()
      .query<RowDataPacket[]>(query, [userID]);
    const user = rows[0]; // 첫 번째 사용자 선택

    if (user && user.passWord === passWord) {
      const userPayload = {
        userID: user.userID,
        userName: user.userName,
        userEmail: user.userEmail,
      };
      const JWT_SECRET = "Login";
      const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "2h" });

      res.status(200).json({ message: "로그인 완료", token });
    } else {
      res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error("로그인 처리 중 오류 발생", error);
    res.status(500).json({ message: "로그인 처리 중 오류 발생" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const connection = await connectToMysql();
  if (!connection) {
    res.status(500).json({ message: "MariaDB 연결 실패" });
    return;
  }

  const { userName, userID, passWord, userEmail, phoneNumber } = req.body;
  const productKey = uuidv4();
  const query = `
    INSERT INTO user (productKey, userName, userID, passWord, userEmail, phoneNumber, addDate)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  try {
    await connection
      .promise()
      .query(query, [
        productKey,
        userName,
        userID,
        passWord,
        userEmail,
        phoneNumber,
      ]);

    res.status(200).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 처리 중 오류 발생:", error);
    res.status(500).json({ message: "회원가입 처리 중 오류 발생", error });
  }
};

export const addNewTitle = async (req: Request, res: Response) => {
  let connection;
  try {
    connection = await connectToMysql();
    console.log("MariaDB 타이틀 전송 성공");
    if (!connection) {
      res.status(500).json({ message: "MariaDB 타이틀 전송 실패" });
      return;
    }

    const { userID, title } = req.body;
    const query = "INSERT INTO talkdata (userID, title) VALUES (?, ?)";
    const [result] = await connection.promise().query(query, [userID, title]);

    res.json({
      success: true,
      message: "Title added successfully",
      result,
      Id: title,
    });
  } catch (err) {
    console.error("Error adding title:", err);
    res.status(500).send({ success: false, message: "Error adding title" });
  }
};
export const getTitleTalkData = async (req: Request, res: Response) => {
  const connection = await connectToMysql();
  if (!connection) {
    res.status(500).json({ message: "MariaDB 연결 실패" });
    return;
  }

  try {
    const query = "SELECT id, title FROM talkdata";
    const [titles] = await connection.promise().query(query);
    res.status(200).json(titles);
  } catch (error) {
    console.error("Title 데이터 조회 실패", error);
    res.status(500).json({ message: "Title 데이터 조회 중 오류 발생", error });
  } finally {
    if (connection) {
      connection.end(); // 연결 종료
    }
  }
};
