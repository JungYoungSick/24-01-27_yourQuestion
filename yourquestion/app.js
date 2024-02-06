const express = require("express");
const next = require('next');


const { saveToMongoDB, getFromMongoDB, saveToAdminCollection, client } = require('./src/app/nosql/server');


const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  console.log('서버 연결')

  // server.js 또는 app.js 내에 있는 해당 부분
  server.post("/nosql/mongodb/user", async (req, res) => {
    try {
      const data = req.body;
      const saveResult = await saveToMongoDB(data); // saveToMongoDB 함수 호출
      res.status(200).json(saveResult); // 성공 응답을 클라이언트에 보냅니다.
    } catch (error) {
      console.error("MongoDB에 데이터 저장 중 오류 발생:", error);
      res.status(500).json({ message: "MongoDB에 데이터 저장 중 오류 발생", error });
    }
  });
  server.get("/nosql/mongodb", (req, res) => {
    const query = req.query;

    getFromMongoDB(query, (error, result) => {
      if (error) {
        console.error("MongoDB 조회 에러:", error);
        return res.status(500).json({ message: "MongoDB에서 데이터 조회 중 오류 발생" });
      }
      console.log("getFromMongoDB 조회 완료");
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

  // 서버의 POST 요청 처리 로직에서는 이 함수를 호출하여 데이터를 저장합니다.
  server.post("/nosql/mongodb/admin", async (req, res) => {
    try {
      const data = req.body;
      await saveToAdminCollection(data); // saveToAdminCollection 함수를 호출하여 데이터를 저장합니다.
      res.status(200).json({ message: "Data saved to admin collection" });
      console.log("호출된 admin data 저장 완료")
    } catch (error) {
      console.error("Error saving data to admin collection:", error);
      res.status(500).json({ message: "Error saving data to admin collection", error });
    }
  });
  // 동적 컬렉션 이름을 사용하여 MongoDB에서 데이터를 조회하는 엔드포인트
  server.get("/nosql/mongodb", async (req, res) => {
    try {
      const collectionName = req.query.collection || 'user'; // 쿼리스트링에서 collection 값을 가져옴
      const collection = client.db('prompt').collection(collectionName);

      if (!collection) {
        return res.status(400).json({ message: "Invalid collection name" });
      }

      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data from MongoDB:", error);
      res.status(500).json({ message: "MongoDB에서 데이터 조회 중 오류 발생", error });
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