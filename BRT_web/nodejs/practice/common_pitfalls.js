/**
 * Created by hong on 2014/7/18.
 */

var async = require('async');

var AsyncSquaringLibrary = {
    squareExponent: 2,
    square: function(number, callback) {
        var result = Math.pow(number, this.squareExponent);
        setTimeout(function() {
            callback(null, result);
        }, 200);
    }
}

async.map([1, 2, 3], AsyncSquaringLibrary.square.bind(AsyncSquaringLibrary), function(err, result) {
    console.log("Error :", err);
    console.log("Result :", result);
});

console.log("AKB48 Maeda Atsuko");