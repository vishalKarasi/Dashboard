import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();
dotenv.config();

// import routes
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import insightRoute from "./routes/insightRoute.js";

// middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", authRoute);
app.use("/api/insights", insightRoute);
app.use("/api/admin", adminRoute);

app.use(errorHandler);

// server
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on Port: ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
