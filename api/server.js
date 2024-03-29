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
    origin: ["https://bespoke-truffle-3baa6f.netlify.app"],
    allowedHeaders: ["Content-Type", "SameSite", "withCredentials"],
    credentials: true,
  })
);
app.use(volleyball);
app.use(morgan("tiny"));
app.use("/api", routes);

db.sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Escuchando en el puerto ", process.env.PORT || 3001);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar el modelo:", error);
  });
