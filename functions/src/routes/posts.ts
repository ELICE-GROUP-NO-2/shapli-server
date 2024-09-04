import {Router} from "express";

export const POSTS_ROUTE = "/posts";
// eslint-disable-next-line new-cap
const postsRouter = Router();

postsRouter.get("/", async (req, res) => {
  res.json();
});

postsRouter.get("/:postId", async (req, res) => {
  // const { playlistId };
});

export default postsRouter;
