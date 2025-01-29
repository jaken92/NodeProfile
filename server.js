require("dotenv").config();
const path = require("path");
const cors = require("cors");

const express = require("express");
const app = express();
// const mongoose = require("mongoose");

// mongoose.connect(process.env.DB_URL);
// const db = mongoose.connection;

// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("Connected to db"));

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: [
      "https://petterjakobsson.netlify.app",
      "https://petterjakobsson.netlify.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// const guestbookRouter = require("./routes/guestbookRouter");
const mailRouter = require("./routes/mailRouter");

// app.use("/guestbook", guestbookRouter);
app.use("/mail", mailRouter);

app.listen(3000, () => console.log("Server started"));
