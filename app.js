import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import connectSQLite3 from "connect-sqlite3";
import 'dotenv/config'
import passport from "./config/passport.js";
import { ensureAuthenticated } from "./middlewares/auth.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import orderformRouter from "./routes/orderform.js";
import orderHistoryRouter from "./routes/orderHistory.js";
import pdfRouter from "./routes/pdf.js";
import authRouter from "./routes/auth.js";

// Get `__dirname` with `path.dirname` in ES modules
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const SQLiteStore = connectSQLite3(session);

var sess = {
  store: new SQLiteStore({
    db: "sessions.sqlite",
    dir: "./",
  }),
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: app.get("env") === "production", // serve secure cookies in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
};

// view engine setup
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/templates"),
]);
app.set("view engine", "pug");

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Middleware to set user variable in res.locals
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes
app.use("/", indexRouter);
app.use("/users", ensureAuthenticated, usersRouter);
app.use("/orderform", ensureAuthenticated, orderformRouter);
app.use("/pdf", ensureAuthenticated, pdfRouter);
app.use("/history", ensureAuthenticated, orderHistoryRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

console.log("Server Started");

export default app;
