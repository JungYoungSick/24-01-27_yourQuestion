import { createConnection } from "mysql2/promise";

interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

// 데이터베이스 연결 설정
const config: DatabaseConfig = {
  host: "localhost",
  user: "root",
  password: "1216",
  database: "Dumi",
};

// MariaDB 연결 함수
async function connectToMysql() {
  try {
    // createConnection 함수를 사용하여 MariaDB에 연결
    const connection = await createConnection(config);
    console.log("MariaDB에 연결되었습니다.");
    return connection;
  } catch (error) {
    console.error("MariaDB 연결에 실패하였습니다:", error);
    // 연결 실패 시 에러를 던져 호출측에서 처리할 수 있도록 함
    throw error;
  }
}

export { connectToMysql };
