const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const authRoute = require("./router/Auth/Auth");
const RecommendationRoute = require("./router/Recommentation/Recommentation");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// import Routes
app.use(authRoute);
app.use(RecommendationRoute);

app.get("/", (req, res) => {
  res.send("Plutus Emporia backend Server !!");
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) =>
    app.listen(PORT, (req, res) => {
      console.log(`Server Start PORT http://localhost:${PORT}/`);
    })
  )
  .catch((err) => console.log(err));
