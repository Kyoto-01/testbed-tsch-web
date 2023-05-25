import express from "express"
import morgan from "morgan"
import path from "path"

import router from "./routes/index.js"


const port = 8080;

const app = express();


app.set('view engine', 'ejs')

app.set('views', "app/views")


app.use(
    express.static(
        path.join(path.resolve(), "public")
    )
);

app.use(morgan("tiny"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router.router);


app.listen(port, () => {
    console.log(`Testbed TSCH Backend Web running in port ${port}.`);
});
