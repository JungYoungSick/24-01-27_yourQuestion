const express = require("express");
const next = require('next');

const { saveToMariaDB } = require('./src/app/mysql/server');
const { saveToMongoDB } = require('./src/app/nosql/server');

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