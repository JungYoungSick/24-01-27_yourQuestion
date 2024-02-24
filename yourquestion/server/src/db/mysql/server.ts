// server.ts
import mysql, { Connection } from "mysql2";

interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

const config: DatabaseConfig = {
  host: "localhost",
  user: "root",
  password: "1216",
  database: "Dumi",
};

async function connectToMysql(): Promise<Connection | null> {
  try {
    const connection: Connection = await mysql.createConnection(config);
    console.log("MariaDB에 연결되었습니다.");
    return connection;
  } catch (error) {
    console.error("MariaDB 연결에 실패하였습니다.", error);
    return null;
  }
}

connectToMysql();
export { connectToMysql };
