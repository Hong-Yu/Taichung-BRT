

var http = require("http");
var url = require("url");

function Start(route, handle) {
   function onRequest(request, response) {
//      var postData = "";
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received");
//      request.setEncoding("utf8");
//      request.addListener("data", function(postDataChunk) {
//         console.log("data event");
//         postData += postDataChunk;
//         console.log("Received POST data chunk '" + postDataChunk + "'.");
//      });
//      request.addListener("end", function() {
//         console.log("end event");
//         route(handle, pathname, response, postData);
//      });
        route(handle, pathname, response, request);

   }
   http.createServer(onRequest).listen(8888);
   console.log("Server has started.");
}

exports.Start = Start;



