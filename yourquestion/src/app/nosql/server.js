// nosql/server.js
console.log('MongoDB를 시작합니다.')
const { MongoClient } = require('mongodb');
const moment = require('moment-timezone');

// MongoDB 연결 문자열입니다. 실제 환경에 맞게 수정해야 합니다.
// 주석 처리된 부분을 환경 변수 등으로 대체하는 것이 보안에 좋습니다.
const uri = "mongodb+srv://jung:1216@cluster0.ufpsr69.mongodb.net/";

// MongoDB 클라이언트를 생성합니다.
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 데이터베이스 이름과 컬렉션 이름을 설정합니다.
// 이 부분을 실제 사용할 데이터베이스와 컬렉션 이름으로 수정해야 합니다.
const dbName = "prompt";
const collectionName = "admin";

// MongoDB에 연결하는 함수입니다.
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('MongoDB에 성공적으로 연결되었습니다.');
  } catch (error) {
    console.error('MongoDB 연결에 실패했습니다:', error);
  }
}

// MongoDB에 데이터를 저장하는 함수입니다.
async function saveToMongoDB(data, callback) {
  try {
    // 데이터베이스와 컬렉션을 선택합니다.
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const getKoreanTimeDate = moment.utc().add(9, 'hours').toDate();
    // 현재 날짜와 시간을 추가합니다.
    const documentToInsert = {
      ...data,
      receivedAt: getKoreanTimeDate() // 현재 날짜와 시간을 기록합니다.
    };

    // 데이터를 컬렉션에 삽입합니다.
    const result = await collection.insertOne(documentToInsert);
    console.log(`MongoDB에 데이터가 저장되었습니다: ${result.insertedId}`);
    // 콜백에 null과 결과를 전달하여 성공을 알립니다.
    callback(null, { message: "데이터 저장 성공", _id: result.insertedId });
  } catch (error) {
    // 에러가 발생하면 콜백에 에러를 전달합니다.
    callback(error);
  }
}

// 서버 시작 시 MongoDB에 연결합니다.
connectToMongoDB();

module.exports = { saveToMongoDB };