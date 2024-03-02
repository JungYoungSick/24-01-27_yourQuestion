// 파일 경로: /config/serverConfig.ts
import express from "express";

export const configureServer = (server: express.Express) => {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
};
