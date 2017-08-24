/**
 * Created by hong on 2014/7/19.
 */
var async = require('async');

async.series([
    function(callback) {
        // do some stuff ....
        callback(null, 'one');
    },
    function(callback) {
        // do some stuff ....
        callback(null, 'two');
    }
],
    //optional callback
    function(err, result) {
        console.log("Error-array :", err);
        console.log("Result-array :", result);
    }
);

// an example using an object instead of an array

async.series({
    one: function(callback) {
        // do some stuff ....
        setTimeout(function(){
            callback(null, 1);
        }, 500);
    },
    two: function(callback) {
        // do some stuff ....
        setTimeout(function(){
            callback(null, 2);
        }, 200);
    }
},
    //optional callback
    function(err, result) {
        console.log("Error-object :", err);
        console.log("Result-object :", result);
    }
);