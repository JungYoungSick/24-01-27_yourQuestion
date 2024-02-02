const express = require("express");
const next = require('next');

const { saveToMariaDB } = require('./src/app/mysql/server');
const { saveToMongoDB, getFromMongoDB, client } = require('./src/app/nosql/server');


const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  console.log('서버 연결')

  server.post("/nosql/mongodb", (req, res) => {
    const data = req.body;
    saveToMongoDB(data, (error, result) => {
      if (error) {
        res.status(500).json({ message: "MongoDB에 데이터 저장 중 오류 발생" });
      } else {
        res.status(200).json({ message: "MongoDB에 데이터 저장 완료" });
      }
    });
  });
  server.get("/nosql/mongodb", (req, res) => {
    const query = req.query;

    getFromMongoDB(query, (error, result) => {
      if (error) {
        console.error("MongoDB 조회 에러:", error);
        return res.status(500).json({ message: "MongoDB에서 데이터 조회 중 오류 발생" });
      }
      return res.status(200).json(result);
    });
  });

  server.post("/nosql/searchAdmin", async (req, res) => {
    try {
      const keyword = req.body.keyword;
      const db = client.db('prompt');
      const collection = db.collection('admin');

      // 부분 문자열 검색을 위한 정규 표현식 사용
      const query = keyword ? { text: { $regex: keyword, $options: "i" } } : {};
      const results = await collection.find(query).toArray();

      res.status(200).json(results);
      console.log("메인서버 데이터 받기 이상없음")
    } catch (error) {
      console.error("Error searching in admin collection", error);
      res.status(500).json({ message: "Error searching in admin collection", error });
    }
  });


  // Next.js 핸들링을 위한 라우트
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // 서버 리스닝
  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});