import { MongoClient, Db, Collection } from "mongodb";
// import AdminTalkPlus from "../../../../Component/Src/Atoms/button/newTalkTogle/adminTalkPlus";

const uri: string = "mongodb+srv://jung:1216@cluster0.ufpsr69.mongodb.net/";
const client: MongoClient = new MongoClient(uri);
const dbName: string = "prompt";
const collectionUserName: string = "user";
const collectionAdminName: string = "admin";
const collectionAdminSaveData: string = "adminSaveData";
const db: Db = client.db(dbName);

// server 시작 시 MongoDB 연결 문구
async function connectToMongoDB(): Promise<void> {
  try {
    await client.connect();
    console.log("MongoDB에 연결되었습니다.");
  } catch (error) {
    console.error("MongoDB 연결에 실패했습니다:", error);
  }
}

// sequenceNumber를 관리하기 위한 함수
async function getNextSequenceNumber(
  collection: Collection,
  userType: string
): Promise<number> {
  const lastDocument = await collection
    .find({})
    .sort({ sequenceNumber: -1 })
    .limit(1)
    .toArray();
  let nextSequenceNumber = 1; // 기본적으로 1로 시작
  if (lastDocument.length !== 0) {
    const lastSequenceNumber = lastDocument[0].sequenceNumber;
    if (userType === "user" && lastSequenceNumber % 2 === 0) {
      nextSequenceNumber = lastSequenceNumber + 2; // user의 경우 홀수로 설정
    } else if (userType === "admin" && lastSequenceNumber % 2 === 1) {
      nextSequenceNumber = lastSequenceNumber + 2; // admin의 경우 짝수로 설정
    } else {
      nextSequenceNumber = lastSequenceNumber + 1; // 다음 시퀸스 넘버 계산
    }
  }

  return nextSequenceNumber;
}

// user data 사용자 데이터 저장
async function userSaveToMongoDB(
  data: Record<string, any>
): Promise<{ message: string; _id: unknown; sequenceNumber: number }> {
  const collection = db.collection(collectionUserName);
  const sequenceNumber = await getNextSequenceNumber(collection, "user"); // sequenceNumber 가져오기
  const documentToInsert = {
    ...data,
    sequenceNumber,
    receivedAt: new Date(),
  };
  const result = await collection.insertOne(documentToInsert);
  console.log(`MongoDB에 사용자 데이터가 저장되었습니다: ${result.insertedId}`);

  return {
    message: "사용자 데이터 저장 성공",
    _id: result.insertedId,
    sequenceNumber,
  };
}

// admin data 사용자 데이터 저장
async function adminSaveToMongoDB(
  data: Record<string, any>
): Promise<{ message: string; _id: unknown; sequenceNumber: number }> {
  const adminCollection = db.collection(collectionAdminName);
  const sequenceNumber = await getNextSequenceNumber(adminCollection, "admin"); // sequenceNumber 가져오기
  const documentToInsert = {
    ...data,
    sequenceNumber,
    receivedAt: new Date(),
  };
  const result = await adminCollection.insertOne(documentToInsert);
  console.log(`MongoDB에 유저 데이터가 저장되었습니다: ${result.insertedId}`);

  return {
    message: "사용자 데이터 저장 성공",
    _id: result.insertedId,
    sequenceNumber,
  };
}
// 메인페이지 내에서 admin data 불러오기.
async function getFromMongoDB(
  query: Record<string, any>
): Promise<Array<Record<string, any>>> {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionUserName);

    const result = await collection.find(query).toArray();
    console.log("Admin 데이터 불러오기 완료");
    return result;
  } catch (error) {
    console.error("getFromMongoDB 함수에서 에러가 발생하였습니다.", error);
    throw error;
  }
}
// 데이터를 저장하는 함수
async function AdminSavaData(
  data: Record<string, any>
): Promise<{ message: string; _id: unknown; sequenceNumber: number }> {
  const collection = db.collection(collectionAdminSaveData);
  const sequenceNumber = await getNextSequenceNumber(
    collection,
    "adminSaveData"
  );
  const adminSave = {
    ...data,
    sequenceNumber,
    receivedAt: new Date(),
  };

  const result = await collection.insertOne(adminSave);
  console.log("저장 전 data 객체:", data);
  return {
    message: "답변자 데이터 저장 성공",
    _id: result.insertedId,
    sequenceNumber,
  };
}
// MongoDB 연결 시작.
connectToMongoDB();

export {
  userSaveToMongoDB,
  getFromMongoDB,
  adminSaveToMongoDB,
  AdminSavaData,
  client,
};
