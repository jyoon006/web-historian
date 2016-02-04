var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var http = require('http');
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};



exports.handleRequest = function (request, response) {
 var pathName = url.parse(request.url).pathname.split('/');

  if(request.method === 'GET'){
// localhost:3030/www.google.com
    if(request.url === '/'){
      fs.readFile('public/index.html', function(error, html){
        response.writeHead(200, headers);
        response.end(html);
      });
    }else if(pathName[1]){
        response.writeHead(200, headers);
        response.end(pathName[1]);
    }
    //else{
    //   //gonna comment this to commit
    //   // 404 not found
    // }
    else{
      response.end();
    }
  }






  if(request.method === 'POST'){
  }

  // resource.end(archive.paths.list);
};
