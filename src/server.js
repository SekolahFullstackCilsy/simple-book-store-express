const express = require("express");
const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");

const app = express();

const db = require("./model");
db.sequelize.sync({}).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(express.json()); // raw json ( "{ "name": "choi", "age": "20" }" ) -> body params
app.use(express.urlencoded({ extended: true })); // x-www-from-urlencoded( "name=choi&age=20" ) -> body params

app.use((req, res, next) => {
  console.log("Incoming request from", req.ip);
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/users", userRoute);
app.use("/books", bookRoute);

app.use((req, res) => {
  res.status(404).send("<h1>Page not found </h1>");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server listened on port", PORT);
});
