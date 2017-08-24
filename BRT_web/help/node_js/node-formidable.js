/**
 * Created by CCT on 2014/5/7.
 */
var formidable = require('formidable'),
   http = require('http'),
   sys = require('sys');
http.createServer(function(req, res){
   console.log(req.url);
   if (req.url == '/upload' && req.method.toLowerCase() == "post") {
      console.log("upload event");
      //parse a file upload
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
         res.writeHead(200, {'context-type': 'text/plain'});
         res.write('received upload:\n\n');
         res.end(sys.inspect({fields: fields, files: files}));
      });
      return;
   }
   // show a file upload form
   res.writeHead(200 , {'content-type' : 'text/html'});
   res.end (
      '<form action="/upload" enctype="multipart/form-data" method="post">' +
         '<input type="text" name="title"><br>' +
         '<input type="file" name="upload" multiple="multiple"><br>' +
         '<input type="submit" value="upload">' +
         '</form>'
   );
}).listen(8888);