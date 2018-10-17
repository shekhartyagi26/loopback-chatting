'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
const mongoose = require('mongoose')
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
  // start the server if `$ node server.js`

  if (require.main === module) {
    let io = require('socket.io')(app.start());
    io.on('connection', function (socket) {
      var myModelName = app.models.cat;
      let options = {
        limit: 100,
        sort: {_id: 1}
      }
      
      myModelName.find({}, options, (err, res) => {
        if (err)
          throw err
        else {
          socket.emit('output', res)
        }
      })

      socket.on('input', function (message) {
        let data = { message: message }
        new myModelName(data).save((err, result)=>{
          if(err)
            throw err
          else
            {
              myModelName.findOne({_id:mongoose.Types.ObjectId(result.id)},(err, res) => {
                if (err)
                  throw err
                else {
                  socket.emit('output', res)
                }
              })
            }
        })
      });

      socket.on('disconnect', function () {
        
      });

    });
  }
});
