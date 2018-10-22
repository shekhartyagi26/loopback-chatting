'use strict';
var loopback = require('loopback');

//Extend API

module.exports = (Cat)=>{

    // 1st Api for getting message from specific cat
    Cat.getMessage = (catId, cb)=>{

        Cat.findById(catId, (err, msg)=>{
            var response = "Message of cat is " + msg.message;
            cb(null, response);
            console.log(response);
        });
    }

    // id geven in query
    // let getMessage  = {

    //     http: { path: '/getMessage', verb: 'get' },
    //     accepts: { arg: 'id', type: 'string', http: { source: 'query' } },
    //     returns: { arg: 'message', type: 'string' }
    // }

    // id geven in params
    // let getMessage  = {

    //     http: { path: '/getMessage/:id', verb: 'get' },
    //     accepts: { arg: 'id', type: 'string' },
    //     returns: { arg: 'message', type: 'string' }
    // }
    
    // data given in body
    let getMessage  = {

        http: { path: '/getMessage', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'message', type: 'object' }
    }

    Cat.remoteMethod ('getMessage', getMessage);
};
