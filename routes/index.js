//var express = require('express');

/* GET home page. */

var serveStatic = require('serve-static');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app) {
  app.server = require('express')();
  var http = require('http').Server(app.server);

  //app.server.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
  app.server.use(logger('dev'));
  app.server.use(serveStatic('public', {}));
  app.server.use(bodyParser.urlencoded({ extended: false }));
  app.server.use(bodyParser.json());
  app.server.use(cookieParser());

  app.server.use(function (req, res, next) {
    req.app = app;
    next();
  });

  // error handlers
  app.server.use(function (err, req, res, next) {
    if (err) {
      var msg = '';
      if (err.message) { msg = err.message; }
      else if (_.isString(err)) { msg = err; }
      else msg = JSON.stringify(err);
      console.log("\033[31m" + err);
      return res.status(500).json({message: msg, stack: err.stack});
    }
    return next();
  });


  app.server.use('/', require('./main.js'));


  http.listen(3000, function () {
    console.log('%s listening at %s', app.server.name, app.server.url);
  });
};


