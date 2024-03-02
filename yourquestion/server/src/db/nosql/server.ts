// MongoDB와의 연결 및 데이터베이스 및 컬렉션에 접근하는 함수를 정의
// 이렇게하면 MongoDB와의 연결 및 데이터베이스 컬렉션에 쉽게 접근할 수 있으며, 필요한 경우 다른 파일에서 해당 함수들을 가져와 사용할 수 있습니다.

import { MongoClient, Db } from "mongodb";

// MongoDB 연결 URL
const uri: string = "mongodb+srv://jung:1216@cluster0.ufpsr69.mongodb.net/";

// MongoDB 클라이언트 인스턴스 생성
const client: MongoClient = new MongoClient(uri);

// 연결할 데이터베이스 및 컬렉션 이름
const dbName: string = "prompt";
const collectionNames = {
  users: "user",
  admins: "admin",
  adminSaveData: "adminSaveData",
};

// MongoDB에 연결하는 함수
export async function connectMongoDB(): Promise<Db> {
  try {
    await client.connect();
    console.log("MongoDB에 연결되었습니다.");

    // 지정된 데이터베이스 선택
    const db: Db = client.db(dbName);

    // 데이터베이스 객체 반환
    return db;
  } catch (error) {
    console.error("MongoDB 연결에 실패했습니다:", error);
    throw error;
  }
}

// 필요한 컬렉션에 접근하는 함수 예시 (선택적)
export async function getUserCollection() {
  const db = await connectMongoDB();
  return db.collection(collectionNames.users);
}

// MongoDB 클라이언트를 외부에서 사용할 수 있도록 export (선택적)
export { client };
