import express from 'express';
import morgan from 'morgan';
import path from 'path';

import router from './routes/index.js';


const port = 80;

const app = express();

const dirname = path.resolve();


app.use(express.static(path.join(dirname, "public")));

app.use(morgan("tiny"));

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Testbed TSCH Backemd Web running in port ${port}.`);
});
