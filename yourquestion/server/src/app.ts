import express from "express";
import next from "next";

import {
  loginUser,
  registerUser,
  addNewTitle,
  getTitleTalkData,
} from "./db/mysql/mariadb";

import {
  saveUserData,
  getUserData,
  searchAdminData,
  saveAdminData,
  adminTalkPlus,
} from "./db/nosql/mongodb";

import { getUserMessages } from "./db/nosql/api/contorollers/talkMessages/userMessages";
import { getAdminMessages } from "./db/nosql/api/contorollers/talkMessages/adminMessages";

const isDev = process.env.NODE_ENV !== "production";
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.post("/nosql/mongodb/user", saveUserData);
  server.get("/nosql/mongodb", getUserData);
  server.post("/nosql/searchAdmin", searchAdminData);
  server.post("/nosql/mongodb/admin", saveAdminData);
  server.post("/newTalk/newHeader/title", addNewTitle);
  server.post("/newTalk/adminTalkPlus/admin", adminTalkPlus);
  server.get("/talk/user", getUserMessages);
  server.get("/talk/admin", getAdminMessages);

  server.post("/login", loginUser);
  server.post("/mysql/mariadb", registerUser);
  server.get("/title/talkdata", getTitleTalkData);

  server.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
