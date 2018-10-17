'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
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
  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start);
    app.io.on('connection', function (socket) {

      var myModelName = app.models.cat;
      let options = {
        limit: 100,
        sort: {
          _id: 1
        }
      }
      
      myModelName.find({}, options, (err, res) => {
        if (err)
          throw err
        else {
          socket.emit('output', res)
        }

      })

      socket.on('input', function (message) {

        myModelName.insert({
          message: message
        }, () => {
          app.io.emit('output', [data])
        })

      });

      socket.on('disconnect', function () {

      });

    });
  }
});
