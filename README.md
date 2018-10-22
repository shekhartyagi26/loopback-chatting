# LoopBack

LoopBack is a highly-extensible, open-source Node.js framework that enables you to:

  * Create dynamic end-to-end REST APIs with little or no coding.
  * Access data from Oracle, MySQL, PostgreSQL, MS SQL Server, MongoDB, SOAP and other REST APIs.
  * Incorporate model relationships and access controls for complex APIs.
  * Use built-in push, geolocation, and file services for mobile apps.
  * Easily create client apps using Android, iOS, and JavaScript SDKs.
  * Run your application on-premises or in the cloud.

LoopBack consists of:

  * A library of Node.js modules.
  * [Yeoman](http://yeoman.io/) generators for scaffolding applications.
  * Client SDKs for iOS, Android, and web clients.

LoopBack tools include:
  * Command-line tool `loopback-cli` to create applications, models, data sources, and so on.

For more details, see [https://loopback.io/](https://loopback.io/).


## Install the LoopBack CLI tool.

  $ npm install -g @loopback/cli

## Create a new loopback application

  $ lb

? What's the name of your application? loopbackProject

? Enter name of the directory to contain the project: loopbackProject
   create loopbackProject/
     info change the working directory to loopbackProject

? Which version of LoopBack would you like to use? 3.x (Active Long Term Support
)

? What kind of application do you have in mind? empty-server (An empty LoopBack 
API, without any configured models or datasources)

## Change directory to your app
  
  $ cd loopbackProject

## Create a model in your app

  $ lb model

? Enter the model name: cat

? Select model's base class PersistedModel

? Expose cat via the REST API? Yes

? Custom plural form (used to build REST URL): 

? Common model or server only? common

Let's add some user properties now.

Enter an empty property name when done.
? Property name: name
   invoke   loopback:property

? Property type: string

? Required? Yes

? Default value[leave blank for none]:

## Run the app

  $ node .

## Install the LoopBack MongoDB connector

  $ npm install --save loopback-connector-mongodb

##  Configure the data source

For the purposes of this example, we will use a preconfigured StrongLoop MongoDB server. Edit server/datasources.json to set the MongoDB configs:

add a code in server/datasources.json
```json
{
  ...
  "mydb": {
    "name": "database",
    "connector": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "",
    "username": "",
    "password": ""
  }
}
```
##  Configure the model config

add a code in server/model-cofig.json

```json
{
  ...
  "cat": {
     "dataSource": "mydb",
    "public": true
  }
}
```

# Installing Socket.io

First, install Socket.IO as follows:
  
  $ npm install socket.io

# Configuring Socket.io on the server side
Add a code in server/server.js
```js
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
```

# Configuring Socket.io on the client side

Add file in server/index.html

```html
<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
      #messages { margin-bottom: 40px }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    <script>
      $(function () {
        var socket = io();
        $('form').submit(function(){
          socket.emit('input', $('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('connect', function() {
          console.log(' Connected !');
        });
        socket.on('output', function(data){
          if(Array.isArray(data)){
            for(let i = 0; i < data.length; i++){
              $('#messages').append($('<li>').text(data[i].message));
            } 
          }
          else{
            $('#messages').append($('<li>').text(data.message));
          }
          window.scrollTo(0, document.body.scrollHeight);
        });
      });
    </script>
  </body>
</html>
```


### Connectors
* [loopback-connector-mongodb](https://github.com/strongloop/loopback-connector-mongodb)
* [loopback-connector-mysql](https://github.com/strongloop/loopback-connector-mysql)
* [loopback-connector-postgresql](https://github.com/strongloop/loopback-connector-postgresql)
* [loopback-connector-rest](https://github.com/strongloop/loopback-connector-rest)

## Resources

  * [Documentation](https://loopback.io/doc/).
  * [API documentation](https://apidocs.strongloop.com/loopback).
  * [LoopBack Announcements](https://groups.google.com/forum/#!forum/loopbackjs-announcements)
  * [LoopBack Google Group](https://groups.google.com/forum/#!forum/loopbackjs).
  * [GitHub issues](https://github.com/strongloop/loopback/issues).
  * [Gitter chat](https://gitter.im/strongloop/loopback).

