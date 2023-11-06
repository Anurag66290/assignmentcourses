import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import path from "path";
import flash from "connect-flash";

import fileUpload from "express-fileupload";
const __dirname = path.resolve();
import http from "http";
import apiRoute from "./routes/apiRoute.js";


console.error = console.log;
dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);

//--------------------------------
// Set View Engine
//--------------------------------
app.set("view engine", "ejs");
app.set("views", "views");

app.use(flash());
app.use(
  fileUpload({
  })
);


mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb://localhost:27017/assignment",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => {
    console.log("Db Connected.....");
  })
  .catch((err) => {
    console.log(err, "=========err=========");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "frontend/build")));
app.use("/*", express.static(path.join(__dirname, "frontend/build")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", apiRoute );


// app.use(errorHandler);




const PORT = 3034;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
