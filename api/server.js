const express = require("express");
const routes = require("./routes");
const morgan = require("morgan");
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const db = require("../api/db");

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(volleyball);
app.use(morgan("tiny"));
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto ", process.env.PORT);
  });
});
