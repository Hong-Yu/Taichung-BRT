/**
 * Created by hong on 2014/7/10.
 */
var udp_client = require("./udp_server");
var http = require("http");


http.createServer(function(request, response) {

}).listen(1985);
udp_client.Initialize();

console.log("Server 'tc-simulator' has been started.");