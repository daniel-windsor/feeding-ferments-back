const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const admin = require("firebase-admin")
const serviceAccount = require("./firebase_admin.json")

const authRouter = require("./routes/authRoutes");
const fermentRouter = require("./routes/fermentRoutes");

const checkAuth = require("./middleware/authMiddleware")

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("successfully connected to db"))
  .catch((err) => console.log(err));

app.use(cors({}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hello!</h2>");
});

app.use("/user", authRouter);
app.use("/ferment", checkAuth, fermentRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
