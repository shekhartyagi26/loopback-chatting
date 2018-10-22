'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    console.log(' Started .');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }

  });
};

boot(app, __dirname, function (err) {
  if (err) throw err;
  if (require.main === module) {
    let io = require('socket.io')(app.start());
    io.on('connection', function (socket) {
      var myModelName = app.models.cat;
      myModelName.find((err, res) => {
        if (err)
          throw err
        else
          socket.emit('output', res)
      })
      socket.on('room', function (data) {
        socket.join(data.roomId);
        socket.on('input', function (data) {
          data.socketId = socket.id
          new myModelName(data).save((err, result) => {
            if (err)
              throw err
            else
              io.emit('output', result)
          })
        });
      });
      socket.on('disconnect', function () {

      });
    });
  }
});
