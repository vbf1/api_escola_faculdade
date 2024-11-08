import express, { Express } from "express";
import chalk from "chalk";
import { userRouter } from "./routes/user.route.js";
import cors from "cors";
import { messageRouter } from "./routes/message.route.js";

const app: Express = express();

//cors
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

//routes
app.use(userRouter);
app.use(messageRouter);

app.listen(8080, () => {
  console.log(chalk.green("🚀🚀🚀 Server is running in port 8080 🚀🚀🚀"));
});
