/**
 * Created by hong on 2014/7/10.
 */
var udp_client = require("./udp_client");
var http = require("http");


http.createServer(function(request, response) {

}).listen(1985);
udp_client.Initialize();
udp_client.AutoSend();

console.log("Server has been started. ");