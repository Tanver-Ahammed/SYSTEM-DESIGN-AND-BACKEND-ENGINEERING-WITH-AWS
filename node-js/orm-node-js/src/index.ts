import "reflect-metadata";
import { AppDataSource } from "./data-source"

import express from 'express';
import { router as StudentRouter } from './router/Student';

const app = express();
const port = 3000;

// Middleware to parse json body
app.use(express.json());

AppDataSource.initialize().then(async () => {

    app.use('/api', StudentRouter);

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });

}).catch(error => console.log(error))
