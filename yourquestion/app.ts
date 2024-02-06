import express from "express";
import next from "next";

import {
  userSaveToMongoDB,
  getFromMongoDB,
  adminSaveToMongoDB,
  client,
} from "./src/app/nosql/server";

const isDev: boolean = process.env.NODE_ENV !== "production";
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  console.log("서버 연결 완료");

  server.post(
    "/nosql/mongodb/user",
    async (req: express.Request, res: express.Response) => {
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
    }
  );

  // express 라이브러리를 사용하는 가정 하에, server.get의 콜백 함수를 async 함수로 변경
  server.get(
    "/nosql/mongodb",
    async (req: express.Request, res: express.Response) => {
      try {
        const query = req.query;
        // getFromMongoDB 함수를 await를 사용하여 호출하고, 결과를 기다립니다.
        const result = await getFromMongoDB(query);
        console.log("getFromMongoDB 조회 완료");
        // 조회가 성공적으로 완료되면, 결과를 클라이언트에 반환합니다.
        return res.status(200).json(result);
      } catch (error) {
        // 오류가 발생하면, 콘솔에 오류를 기록하고 클라이언트에 에러 메시지를 반환합니다.
        console.error("MongoDB 조회 에러:", error);
        return res
          .status(500)
          .json({ message: "MongoDB에서 데이터 조회 중 오류 발생" });
      }
    }
  );

  // 기타 라우트는 이와 유사하게 변환합니다.

  server.all("*", (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
