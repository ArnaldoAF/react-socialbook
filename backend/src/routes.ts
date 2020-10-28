import express from 'express';

const routes = express.Router();

routes.get("/test", (request, response) => {
    console.log("test");
    return response.json({"test": "ok"})
})

export default routes;