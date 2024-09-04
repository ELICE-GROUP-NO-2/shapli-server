import { Router } from "express";

export const HELLO_ROUTE = "/hello";
// eslint-disable-next-line new-cap
const helloRouter = Router();

helloRouter.get("/", (_, res) => {
  res.send("Hello World");
});

export default helloRouter;
