import express, { Express } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import config from "./configs";
import connectDB from "./configs/db";
import errorHandler from "./middlewares/errorHandler";

import indexRouter from "./routes/index.router";
import userRouter from "./routes/user.router";
import productRouter from "./routes/product.router";
import categoryRouter from "./routes/category.router";

const app: Express = express();

// connect db
connectDB();

app.use(
  cors({
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// path v1
const pathAPI = "api";
const version = "V1";
const apiPathV1 = `${pathAPI}/${version}`;

// route prefix v1
app.use(`/${apiPathV1}/`, indexRouter);
app.use(`/${apiPathV1}/user`, userRouter);
app.use(`/${apiPathV1}/product`, productRouter);
app.use(`/${apiPathV1}/category`, categoryRouter);

app.use(errorHandler);

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(
    `Express (TypeScript)
----------------------------------------
🏃‍♂️ Server running on http://localhost:${config.PORT}
----------------------------------------
`
  );
});
