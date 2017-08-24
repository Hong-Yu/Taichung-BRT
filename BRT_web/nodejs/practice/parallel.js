/**
 * Created by hong on 2014/7/19.
 */
/**
 * Created by hong on 2014/7/19.
 */
var async = require('async');

async.parallel([
    function(callback) {
        // do some stuff ....
        setTimeout(function(){
            callback(null, 'one');
        }, 200);
    },
    function(callback) {
        // do some stuff ....
        setTimeout(function(){
            callback(null, 'two');
        }, 100);
    }
],
    //optional callback
    function(err, result) {
        console.log("Error-array :", err);
        console.log("Result-array :", result);
    }
);

// an example using an object instead of an array

async.parallel({
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