/**
 * Created by CCT on 2014/5/6.
 */
var querystring = require("querystring"),
   fs = require("fs"),
   formidable = require("formidable");

function start(response, postData) {
   console.log("Request handler 'start' was called.");
   var body="";
   body += "<html>";
   body += "<head>";
   body += "    <meta http-equiv=\"Content-Type\" content=\"text\/html\" charset=\"UTF-8\">";
   body += "<\/head>";
   body += "<body>";
//   body += "<form action=\"/upload\" method=\"post\">";
//   body += "    <textarea name=\"text\" rows=\"20\" cols=\"60\"><\/textarea>";
//   body += "    <input type=\"submit\" value=\"Submit text\">";
   body += '<form action="/upload" enctype="multipart/form-data" method="post">';
   body += '<input type="file" name="upload" multiple="multiple">';
   body += '<input type="submit" value="Upload file"/>';
   body += "<\/form>";
   body += "<\/body>";
   body += "<\/html>";
   response.writeHead(200, {"Content-Type": "text/html"});
   response.write(body);
   response.end();
}

function upload(response, request) {
   console.log("Request handler 'upload' was called.");
   var form = new formidable.IncomingForm();
   console.log("about to parse");
   form.parse(request, function(err, fields, files) {
      console.log("parsing done");
//      possible error on windows systems: tried to rename to an already exiting file
      fs.rename(files.upload.path, "C:\\tmp\\test.png", function(err){
         if(err) {
            fs.unlink("C:\\tmp\\test.png");
            fs.rename(files.upload.path, "C:\\tmp\\test.png");
         }
      } );

      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('received image:<br/>');
      response.write('<img src="/show" />');
      response.end();
   });
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("You've sent the text: " + querystring.parse(postData).text);
//   response.end();
}

function show(response) {
   console.log("Request handler 'show' was called.");
   fs.readFile("C:\\tmp\\test.png", "binary", function(error, file) {
      if (error) {
         response.writeHead(500, {"Content-Type": "text/plain"});
         response.write(error + "\n");
         response.end();
      } else {
         response.writeHead(200, {"Content-Type": "image/png"});
         response.write(file, "binary");
         response.end();
      }
   });
}
exports.start = start;
exports.upload = upload;
exports.show = show;

