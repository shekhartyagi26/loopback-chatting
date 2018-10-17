'use strict';
// var pubsub = require('../../server/pubsub')
var loopback = require('loopback');

module.exports = function(Cat) {

    // Cat after save..
  // Cat.observe('after save', function (ctx, next) {
  //   var socket = Cat.app.io;
  //   if (ctx.isNewInstance) {
  //     //Now publishing the data..
  //     pubsub.publish(socket, {
  //       collectionName: 'Cat',
  //       data: ctx.instance,
  //       method: 'POST'
  //     });
  //   } 
  //   else {
  //     //Now publishing the data..
  //     pubsub.publish(socket, {
  //       collectionName: 'Cat',
  //       data: ctx.instance,
  //       modelId: ctx.instance.id,
  //       method: 'PUT'
  //     });
  //   }
  //   //Calling the next middleware..
  //   next();
  // }); //after save..
  // //CatDetail before delete..
  // Cat.observe("before delete", function (ctx, next) {
  //   var socket = Cat.app.io;
  //   //Now publishing the data..
  //   pubsub.publish(socket, {
  //     collectionName: 'Cat',
  //     data: ctx.instance.id,
  //     modelId: ctx.instance.id,
  //     method: 'DELETE'
  //   });
  //   //move to next middleware..
  //   next();
  // }); //before delete..


  // Cat.greet = function (msg, cb) {
  //   cb(null, 'Greetings... ' + msg);
  // }

  // Cat.remoteMethod('greet', {
  //   accepts: {
  //     arg: 'msg',
  //     type: 'string'
  //   },
  //   returns: {
  //     arg: 'greeting',
  //     type: 'string'
  //   }
  // });

};
