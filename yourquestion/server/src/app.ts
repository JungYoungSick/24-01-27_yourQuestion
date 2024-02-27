import express from "express";
import next from "next";

import { mariaControllers } from "./db/mysql/mariadb";
import { connectToMysql } from "./db/mysql/server";

import { connectMongoDB } from "./db/nosql/server";
import { mongoControllers } from "./db/nosql/mongodb";

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
  server.post("/nosql/searchAdmin", mongoControllers.searchAdminData);
  server.post("/nosql/mongodb/admin", mongoControllers.saveAdminData);
  server.post("/newTalk/adminTalkPlus/admin", mongoControllers.adminTalkPlus);
  server.get("/talk/user", mongoControllers.getUserMessages);
  server.get("/talk/admin", mongoControllers.getAdminMessages);

  server.post("/newTalk/newHeader/title", mariaControllers.addNewTitle);
  server.post("/login", mariaControllers.loginUser);
  server.post("/mysql/mariadb", mariaControllers.registerUser);
  server.get("/title/talkdata", mariaControllers.getTitleTalkData);
  server.get("/talkData/:userID", mariaControllers.getTitlesByUserID);

  server.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
