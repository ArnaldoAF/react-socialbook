import express from 'express';

import UserController from './controllers/userController';
import PostController from './controllers/postController';
import CommentController from './controllers/commentController';

const routes = express.Router();

const userController = new UserController();
const postController = new PostController();
const commentController = new CommentController();

routes.get("/test", (request, response) => {
    console.log("test");
    return response.json({"test": "ok"})
});

routes.get("/login", userController.login);
routes.post("/user", userController.create);
routes.put("/user", userController.update);
routes.get("/user/:id", userController.select);

routes.post("/post", postController.create);
routes.get("/post", postController.index);
routes.get("/post/:id", postController.index);
routes.put("/post", postController.update);
routes.delete("/post/:id", postController.delete);


routes.post("/post/:id/comments", commentController.create);
routes.get("/post/:id/comments", commentController.index);
routes.get("/comments/:comment_id", commentController.index);
routes.get("/comments", commentController.index);
routes.put("/comments/:id", commentController.update);
routes.delete("/comments/:id", commentController.delete);

export default routes;