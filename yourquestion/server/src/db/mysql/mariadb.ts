// db/mysql/mariaDbControllers.ts

import { loginUser } from "./api/controllers/loginUser";
import { registerUser } from "./api/controllers/registerUser";
import { addNewTitle } from "./api/controllers/addNewTitle";
import { getTitleTalkData } from "./api/controllers/getTitleTalkData";
import { getTitlesByUserID } from "./api/controllers/getTitlesByUserID";
export const mariaControllers = {
  loginUser,
  registerUser,
  addNewTitle,
  getTitleTalkData,
  getTitlesByUserID,
};
