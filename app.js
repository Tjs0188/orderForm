import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import orderformRouter from './routes/orderform.js';
import pdfRouter from './routes/pdf.js';

// Get `__dirname` with `path.dirname` in ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Live reload
const liveReloadServer = livereload.createServer({
  exts: ['js', 'css', 'pug'], // Extensions to watch for changes
  delay: 100 // Delay before refreshing, can help with saving changes
});
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.watch(path.join(__dirname, 'views'));
const app = express();

app.use(connectLivereload());

// view engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/templates'),
]);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orderform', orderformRouter);
app.use('/pdf', pdfRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



console.log("Server Started");

export default app;

