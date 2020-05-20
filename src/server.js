// load HTTP library
var http = require("http");

// Create HTTP server to handle responses
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Hello Worlddddd");
    response.end();
}).listen(8888);
