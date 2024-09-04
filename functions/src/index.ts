// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { onRequest } from "firebase-functions/v2/https";
// import {onDocumentCreated} from "firebase-functions/v2/firestore";
// import {log} from "firebase-functions/logger";

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
// import {getFirestore} from "firebase-admin/firestore";

import express from "express";
import cors from "cors";
import postsRouter, { POSTS_ROUTE } from "./routes/posts";
import helloRouter, { HELLO_ROUTE } from "./routes/hello";
import morgan from "morgan";

initializeApp();

const app = express();

const SEOUL_REGION = "asia-northeast3";

const corsConfig = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsConfig));
app.get("/", (_, res) => {
  res.json({ status: "OK" });
});
app.use(HELLO_ROUTE, helloRouter);
app.use(POSTS_ROUTE, postsRouter);

export const api = onRequest(
  {
    region: SEOUL_REGION,
  },
  app
);
