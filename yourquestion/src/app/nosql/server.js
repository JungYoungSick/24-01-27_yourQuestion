// nosql/server.js
console.log('MongoDB를 시작합니다.')
const { MongoClient } = require('mongodb');

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
const collectionName = "user";

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
async function saveToMongoDB(data) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const documentToInsert = {
      ...data,
      receivedAt: new Date() // 현재 날짜와 시간을 기록합니다.
    };

    const result = await collection.insertOne(documentToInsert);
    console.log(`MongoDB에 데이터가 저장되었습니다: ${result.insertedId}`);

    return { message: "데이터 저장 성공", _id: result.insertedId }; // 성공 메시지와 ID를 반환합니다.
  } catch (error) {
    console.error('MongoDB에 데이터 저장 중 오류 발생:', error);
    throw error; // 에러를 던져서 호출한 쪽에서 처리할 수 있도록 합니다.
  }
}

// MongoDB에 admin 컬렉션에 데이터를 저장하는 함수입니다.
async function saveToAdminCollection(data) {
  const db = client.db('prompt');
  const adminCollection = db.collection('admin');

  const documentToInsert = {
    ...data,
    receivedAt: new Date() // 현재 날짜와 시간을 기록합니다.
  };
  const result = await adminCollection.insertOne(documentToInsert);
  console.log(`New document added to admin collection: ${result.insertedId}`);
  console.log("Admin 데이터 저장 완료")
  return result;
}

// MongoDB에서 데이터를 조회하는 함수입니다.
async function getFromMongoDB(query) {
  try {
    // 데이터베이스와 컬렉션을 선택합니다.
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 쿼리를 사용하여 데이터를 검색합니다.
    const result = await collection.find(query).toArray();
    // console.log(`조회된 데이터: ${JSON.stringify(result, null, 2)}`);

    // 함수에서 직접 결과를 반환합니다.
    console.log("Admin 데이터 불러오기 완료")
    return result;
  } catch (error) {
    // 에러가 발생하면 에러를 로깅하고, 에러를 던집니다.
    console.error("getFromMongoDB 함수에서 에러가 발생하였습니다.", error);
    throw error; // 에러를 던져서 호출한 쪽에서 처리할 수 있도록 합니다.
  }
}


// 서버 시작 시 MongoDB에 연결합니다.
connectToMongoDB();

module.exports = { saveToMongoDB, getFromMongoDB, saveToAdminCollection, client };