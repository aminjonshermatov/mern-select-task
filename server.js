const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/countries", require("./routes/countries.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const start = () => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
};

start();
