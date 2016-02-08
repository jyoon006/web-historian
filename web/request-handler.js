var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var urlParse = require('url');
var http = require('http');

var headers = helpers.headers;

exports.handleRequest = function (request, response) {
  var url = urlParse.parse(request.url).pathname;
  console.log(url);
  if(request.method === 'GET'){
    // Redirect root request to index.html
    if(request.url === '/'){
      fs.readFile('public/index.html', function(error, html){
        if(error) {
          helpers.sendResponse(response, '404 status error', 404);
        }
        helpers.sendResponse(response, html, 200);

      });
    // Otherwise, return archived site.
    }
    else{
      var site = urlParse.parse(request.url).pathname.split('/')[1];
      console.log('site: ' + site);
      fs.readFile(archive.paths.archivedSites + '/' + site, function(error, data){
        if(error) {
          helpers.sendResponse(response, '404 status error', 404);
        }
        else {
          helpers.sendResponse(response, data, 200);
        }
      });
    }


  // If user submits a website
  }
  else if(request.method === 'POST'){

    archive.getUrlFromFormData(request, response, function(url) {
      var fixturePath = archive.paths.archivedSites + "/" + url;
      var urlName = fixturePath.split(".")[1];
      
      // Add site file to archive/sites/.
      // fs.writeFile(fixturePath, urlName);
      archive.isUrlInList(url, function(inList) {
        if(inList) { //if the url is in the list
        //if url is archived
          archive.isUrlArchived(url, function(exists) {
            if(exists) {  //if the url is archived return the website 
              fs.readFile(fixturePath, function(err, text) {
                helpers.sendResponse(response, text, 200);
              });
            }
            else {  //if the url is not archived, archive it and return loading.html
              fs.writeFile(archive.paths.archivedSites + '/' + url, url, function(err, data) { 
              });
            }
          });
        }
        else {
          archive.addUrlToList(url, function() {
            fs.readFile('public/loading.html', function(error, html){
              helpers.sendResponse(response, html, 200);
            });
          });
        }
      });

      

    });
  }
};