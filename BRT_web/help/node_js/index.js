/**
 * Created by CCT on 2014/5/6.
 */
var server = require("./server");
var route = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = new Object();
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
server.Start(route.route, handle);
