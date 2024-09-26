import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/index.js";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with frontend's URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.disable("x-powered-by");
app.disable("etag");

app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
