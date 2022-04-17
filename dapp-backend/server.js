const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const fileRouter = require("./routes/file");

app.use("/file", fileRouter);

app.listen(3000);
