'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    let baseUrl = app.get('url').replace(/\/$/, '');
    if (app.get('loopback-component-explorer')) {
      let explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

const onConnect = (io) => {
  io.on('connection', function(socket) {
    var myModelName = app.models.cat;
    myModelName.find((err, res) => {
      if (err) throw err
      else socket.emit('output', res)
    })

    socket.on('room', function(data) {
      socket.join(data.roomId);
      socket.on('input', function(data) {
        data.socketId = socket.id
        new myModelName(data).save((err, result) => {
          if (err)
            throw err
          else
            io.emit('output', result)
        })
      });
    });

    socket.on('disconnect', function() {});
  });
}


boot(app, __dirname, function(err) {
  if (err) throw err;
  if (require.main === module) {
    let io = require('socket.io')(app.start());
    onConnect(io);
  }
});
