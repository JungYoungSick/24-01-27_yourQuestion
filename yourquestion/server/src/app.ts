import express, { Request, Response } from "express";
import next from "next";
import { v4 as uuidv4 } from "uuid"; // uuid 모듈 import
import * as jwt from "jsonwebtoken";
import {
  userSaveToMongoDB,
  getFromMongoDB,
  adminSaveToMongoDB,
  AdminSavaData,
  client,
} from "../../Server/Src/db/nosql/server";
import { connectToMysql } from "../../Server/Src/db/mysql/server";
import { RowDataPacket } from "mysql2"; // 필요한 타입 import

const isDev = process.env.NODE_ENV !== "production";
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // 사용자 데이터를 MongoDB에 저장
  server.post("/nosql/mongodb/user", async (req: Request, res: Response) => {
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
  });

  // MongoDB에서 데이터 조회
  server.get("/nosql/mongodb", async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const result = await getFromMongoDB(query);
      console.log("getFromMongoDB 조회 완료");
      res.status(200).json(result);
    } catch (error) {
      console.error("MongoDB 조회 에러:", error);
      res.status(500).json({ message: "MongoDB에서 데이터 조회 중 오류 발생" });
    }
  });

  // MongoDB 답변자 데이터 조회 기능
  server.post("/nosql/searchAdmin", async (req: Request, res: Response) => {
    try {
      const keyword = req.body.keyword;
      const db = client.db("prompt");
      const collection = db.collection("admin");
      const query = keyword ? { text: { $regex: keyword, $options: "i" } } : {};
      const results = await collection.find(query).toArray();
      res.status(200).json(results);
      console.log("메인서버 데이터 받기 이상없음");
    } catch (error) {
      console.error("Error searching in admin collection", error);
      res
        .status(500)
        .json({ message: "Error searching in admin collection", error });
    }
  });

  // 관리자 데이터를 MongoDB에 저장
  server.post("/nosql/mongodb/admin", async (req: Request, res: Response) => {
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
  });

  // mariaDB user 메세지 데이터 연결 조회 요청
  server.get("/talk/user", async (req: Request, res: Response) => {
    try {
      const dbName = "prompt";
      const collectionName = "user";
      await client.connect();
      const database = client.db(dbName); // 데이터베이스 이름 설정
      const collection = database.collection(collectionName); // 컬렉션 이름 설정
      const messages = await collection.find({}).toArray(); // 모든 메시지 조회
      res.status(200).json(messages);
    } catch (error) {
      console.error("Failed to fetch messages from MongoDB:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch messages", error: toString() });
    }
  });
  // mariaDB admin 메세지 데이터 연결 조회 요청
  server.get("/talk/admin", async (req: Request, res: Response) => {
    try {
      const dbName = "prompt";
      const collectionName = "admin";
      await client.connect();
      const database = client.db(dbName); // 데이터베이스 이름 설정
      const collection = database.collection(collectionName); // 컬렉션 이름 설정
      const messages = await collection.find({}).toArray(); // 모든 메시지 조회
      res.status(200).json(messages);
    } catch (error) {
      console.error("Failed to fetch messages from MongoDB:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch messages", error: toString() });
    }
  });

  // mariaDB 로그인 요청 로직
  server.post("/login", async (req: Request, res: Response) => {
    const connection = await connectToMysql();
    if (!connection) {
      res.status(500).json({ message: "MariaDB 연결 실패" });
      return;
    }

    const { userID, passWord } = req.body;

    const query = `SELECT * FROM user WHERE userID = ?`;
    try {
      // 쿼리 결과 타입을 명시적으로 지정
      const [rows] = await connection
        .promise()
        .query<RowDataPacket[]>(query, [userID]);
      const user = rows[0]; // 첫 번째 사용자 선택

      if (user) {
        if (user.passWord === passWord) {
          // 평문 비밀번호 비교, 실제로는 해시 비교를 권장
          const userPayload = {
            userID: user.userID,
            userName: user.userName,
            userEmail: user.userEmail,
          };
          const JWT_SECRET = "Login"; // 실제로는 안전하게 관리되어야 하는 비밀키
          const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "2h" });

          res.status(200).json({ message: "로그인 완료", token });
        } else {
          res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
        }
      } else {
        res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }
    } catch (error) {
      console.error("로그인 페이지 연결 실패", error);
      res.status(500).json({ message: "로그인 처리 중 오류 발생" });
    }
  });

  // mariaDB 회원가입 요청 로직
  server.post("/mysql/mariadb", async (req: Request, res: Response) => {
    const connection = await connectToMysql();
    if (!connection) {
      res.status(500).json({ message: "MariaDB 연결 실패" });
      return;
    }

    const { userName, userID, passWord, userEmail, phoneNumber } = req.body;

    const productKey = uuidv4(); // UUID 생성하여 productKey에 할당

    const query = `
      INSERT INTO user (productKey, userName, userID, passWord, userEmail, phoneNumber, addDate)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    try {
      const [result] = await connection
        .promise()
        .query(query, [
          productKey,
          userName,
          userID,
          passWord,
          userEmail,
          phoneNumber,
        ]);

      res.status(200).json({ message: "회원가입 성공", result });
    } catch (error) {
      console.error("회원가입 처리 중 오류 발생:", error);
      res.status(500).json({ message: "회원가입 처리 중 오류 발생", error });
    }
  });

  server.post("/newTalk/newHeader/title", async (req, res) => {
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
  });
  server.post(
    "/newTalk/adminTalkPlus/admin",
    async (req: Request, res: Response) => {
      try {
        const data = req.body;
        const result = await AdminSavaData(data);
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
    }
  );
  server.get("/title/talkdata", async (req: Request, res: Response) => {
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
      res
        .status(500)
        .json({ message: "Title 데이터 조회 중 오류 발생", error });
    } finally {
      if (connection) {
        connection.end(); // 연결 종료
      }
    }
  });

  server.get("/api/lastTitle", (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, "Login") as jwt.JwtPayload;
        const userID = decoded.userID;

        // userID를 기반으로 데이터베이스에서 사용자의 마지막 대화 타이틀을 조회
        // 여기서는 조회 로직을 가정합니다.
        const lastTitle = "사용자의 마지막 대화 타이틀";

        res.json({ title: lastTitle });
      } catch (error) {
        res.status(401).send("Invalid token");
      }
    } else {
      res.status(401).send("No token provided");
    }
  });
  // Next.js 라우트 핸들링
  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  // 서버 리스닝
  const port = process.env.PORT || 3000;
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
