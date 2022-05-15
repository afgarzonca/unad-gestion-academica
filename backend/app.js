var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var express = require("express");
var path = require("path");
var cors = require("cors");
var logger = require("morgan");
var dotenv = require("dotenv");
var conectarBD = require("./db/db.js");
var http = require("http");
var cors = require('cors');

dotenv.config(); //para que nos deje usar dotenv (variables de entorno) en toda la aplicación

const app = express();

var port = normalizePort(process.env.PORT || "4000");
app.set("port", port);
app.use(cors());

var server = http.createServer(app);

// controladores db
var conectarBD = require("./db/db.js");
var UsuarioController = require("./modules/usuario/usuario.module")()
  .UsuarioController;

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.use("/usuarios", UsuarioController);

app.get("/", function (req, res) {
  res.json({ message: "Hola, este es el API de tu aplicación" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: res.locals.message,
    error: res.locals.error,
  });
});

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  conectarBD();
  console.log("Listening on " + bind);
}

module.exports = app;
