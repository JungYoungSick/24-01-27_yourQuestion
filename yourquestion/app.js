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

  // MariaDB 데이터 저장 API
  server.post("/api/mariadb", (req, res) => {
    const data = req.body;
    saveToMariaDB(data, (error, result) => {
      if (error) {
        res.status(500).send("MariaDB에 데이터 저장 중 오류 발생");
      } else {
        res.status(200).send("MariaDB에 데이터 저장 완료");
      }
    });
  });

  // MongoDB 데이터 저장 API
  server.post("/api/mongodb", (req, res) => {
    const data = req.body;
    saveToMongoDB(data, (error, result) => {
      if (error) {
        res.status(500).send("MongoDB에 데이터 저장 중 오류 발생");
      } else {
        res.status(200).send("MongoDB에 데이터 저장 완료");
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




// const express = require("express");
// const next = require('next');
// const mysql = require('mysql2');
// const isDev = process.env.NODE_ENV !== 'development';
// const app = next({ dev: isDev });
// const handle = app.getRequestHandler();
// // 로그인 토큰 발행을 위한 import
// const jwt = require('jsonwebtoken');  //
// const crypto = require('crypto');     // 보안 관련 작업을 수행하는 모듈
// const secretKey = crypto.randomBytes(32).toString('hex');
// // MariaDB 연결 설정
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1216",
//   database: "admin",
// });
// app.prepare().then(() => {
//   const server = express();
//   server.use(express.json());
//   server.use(express.urlencoded({ extended: true }));
//   //채팅한 데이터들 기록 API 엔드포인트
//   server.post("/talk", (req, res) => {
//     const { listngsAndReviews } = req.body;
//   }
//   )

//   // 로그인 API 엔드포인트
//   server.post("/login", (req, res) => {
//     const { lyrics } = req.body;
//     // 해당 사용자가 존재하는지 확인하는 쿼리
//     // const query = "SELECT * FROM korean WHERE lyrics = ? AND verse = 0 "; 
//     //! 위 query는 로그인 작업 시 내 데이터명 정보로 데이터 변경 필요.
//     connection.query(query, [lyrics], (err, results, fields) => {
//       if (err) {
//         console.error("Error logging in:", err);
//         res.status(500).json({ message: "로그인에 실패했습니다." });
//         return;
//       }
//       // 로그인 성공 여부 확인
//       if (results.length > 0) {
//         const user = results[0];
//         const tokenPayload = {
//           lyrics: user.lyrics,
//         };
//         const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
//         res.status(200).json({ message: "정상적인 연결입니다.", token });
//       } else {
//         res.status(401).json({ message: "연결이 되지 않습니다." });
//       }
//     });
//   });
//   // Next.js 서버에 라우팅 위임
//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });
//   // 서버 시작
//   const port = 3000;
//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });