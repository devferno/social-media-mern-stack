const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
dotenv.config();

//routes
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");

//db connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () =>
  console.log("succes connect")
);
//middellwares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes middellwares
app.use("/users", userRouter);
app.use("/", authRouter);
app.use("/posts", postRouter);

app.listen(4000, () => console.log("server ready"));
