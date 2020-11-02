import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();


app.use(express.json());
console.log("express.json() 🚀");
app.use(cors());
console.log("cors 🚀");
app.use(routes);


app.listen(3333);
console.log("running 🚀");