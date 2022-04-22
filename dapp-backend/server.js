const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const fileRouter = require("./routes/file");
const postsRouter = require("./routes/posts");
const requestRouter = require("./routes/request");

app.use("/file", fileRouter);
app.use("/request", requestRouter);

app.listen(3000);
