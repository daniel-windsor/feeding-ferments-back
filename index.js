const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const redis = require("redis");
const session = require("express-session");

const authRouter = require("./routes/authRoutes");
const fermentRouter = require("./routes/fermentRoutes");

const protect = require("./middleware/authMiddleware")

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

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

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: false,
      maxAge: 600000,
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hello!</h2>");
});

app.use("/user", authRouter);
app.use("/ferment", protect, fermentRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
