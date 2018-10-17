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

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
var i = 1;
var j = 2;

boot(app, __dirname, function (err) {

  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    require('socketio-auth')(app.io, {
      authenticate: function (socket, value, callback) {

        var AccessToken = app.models.AccessToken;
        //get credentials sent by the client
        var token = AccessToken.find({
          where: {
            and: [{
              userId: value.userId
            }, {
              id: value.id
            }]
          }
        }, function (err, tokenDetail) {
          if (err) throw err;
          if (tokenDetail.length) {
            callback(null, true);
          } else {
            callback(null, false);
          }
        }); //find function..    
      } //authenticate function..
    });

    app.io.on('connection', function (socket) {

      var myModelName = app.models.cat;
      
      let options = {
        limit:100, 
        sort:{ _id:1 }
      }

      myModelName.find({}, options, (err, res)=>{
        if(err)
          throw err
        else{
          socket.emit('output' , res)
        }
          
      })

      socket.on('input', function (message) {
        
          myModelName.insert({ message:message }, ()=>{
            app.io.emit('output', [data])
          })

      });
      
      socket.on('disconnect', function () {
        
      });

    });
  }
});
