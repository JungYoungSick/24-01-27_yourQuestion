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
  user: "jung",
  password: "1216",
  database: "Dumi",
};

async function connectToDatabase(): Promise<Connection | null> {
  try {
    const connection: Connection = await mysql.createConnection(config);
    console.log("Connected to MariaDB");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    return null;
  }
}

export { connectToDatabase };
