'use strict';
var loopback = require('loopback');

//Extend API

module.exports = (Cat) => {

  // 1st Api for getting message from specific cat
  Cat.getMessage = (catId, cb) => {

    Cat.findById(catId, (err, msg) => {
      var response = "Message of cat is " + msg.message;
      cb(null, response);
      console.log(response);
    });
  }

  let getMessage = {

    http: { path: '/getMessage', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'message', type: 'object' }
  }

  Cat.remoteMethod('getMessage', getMessage);
};
