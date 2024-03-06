// Express 서버를 설정하고 여러 종류의 데이터베이스와 연결된 컨트롤러를 사용하여 다양한 엔드포인트를 설정
//이 코드는 다양한 데이터베이스와 연결되어 있는 경우에도 모든 요청을 효율적으로 처리하고 있습니다.

import express from "express";
import next from "next";

import { mariaControllers } from "./db/mysql/mariadb";
import { connectToMysql } from "./db/mysql/server";

import { connectMongoDB } from "./db/nosql/server";
import { mongoControllers } from "./db/nosql/mongodb";
import deleteTitleFromDB from "../../pages/Component/Src/Molecules/deleteTitleFromDB";

const isDev = process.env.NODE_ENV !== "production";
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  connectToMysql();
  connectMongoDB();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.post("/nosql/mongodb/user", mongoControllers.saveUserData);
  server.get("/nosql/mongodb", mongoControllers.getUserData);
  server.post("/nosql/searchAdminSaveData", mongoControllers.searchAdminData);
  server.post("/nosql/mongodb/admin", mongoControllers.saveAdminData);
  server.post("/newTalk/adminTalkPlus/admin", mongoControllers.adminTalkPlus);
  server.get("/talk/user", mongoControllers.getUserMessages);
  server.get("/talk/admin", mongoControllers.getAdminMessages);
  server.post("/saveAdminData", mongoControllers.saveAdminData);
  server.get("/user/message", mongoControllers.getUserIDTitle);
  server.get("/admin/message", mongoControllers.getAdminIDTitle);

  server.post("/newTalk/newHeader/title", mariaControllers.addNewTitle);
  server.post("/login", mariaControllers.loginUser);
  server.post("/mysql/mariadb", mariaControllers.registerUser);
  server.get("/title/talkdata", mariaControllers.getTitleTalkData);
  server.get("/talkData/:userID", mariaControllers.getTitlesByUserID);
  server.delete("/talkList/delite/:title", mariaControllers.handleDeleteTitle);
  server.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
