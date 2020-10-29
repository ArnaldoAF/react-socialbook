import express from 'express';

import UserController from './controllers/userController';
import PostController from './controllers/postController';

const routes = express.Router();

const userController = new UserController();
const postController = new PostController();

routes.get("/test", (request, response) => {
    console.log("test");
    return response.json({"test": "ok"})
});

routes.post("/user", userController.create);
routes.put("/user", userController.update);
routes.get("/user/:id", userController.select);

routes.post("/post", postController.create);
routes.get("/post", postController.index);
routes.get("/post/:id", postController.index);
routes.put("/post", postController.update);
routes.delete("/post/:id", postController.delete);

export default routes;