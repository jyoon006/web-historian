var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var validUrl = require('valid-url');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// Extract and return requested URL from HTML form data.
exports.getUrlFromFormData = function(request, response, cb){
  var url = '';
  request.on('data', function(chunk, cb){
    url += chunk;
    url = url.split('url=')[1]; 
    console.log('geturlfromformdata: ' + url);
    
    // cb(url);
    // return;
  }).on('end', function() {
    return cb(url);
  });
};

// Check whether requested URL is valid.
exports.isUrlValid = function(url){
  console.log('in isUrlValid');
  console.log('url is' + url);
  if (!(validUrl.isUri(url))){
    return false;
  }else{
    return true
  }
};

exports.readListOfUrls = function(cb){
  var data = "";
  fs.readFile(this.paths.list, function(err, buffer) {
    data += buffer;
    data = data.split("\n");
    cb(data);
  })
};

// Check whether URL is already in sites.txt array
exports.isUrlInList = function(url, cb){
  this.readListOfUrls(function(listArr) {
    if(listArr.indexOf(url) === -1) {
      cb(false);
    }
    else {
      cb(true);
    }
  });
};

// Take list as array, check if url is in it, append if not.
exports.addUrlToList = function(url, cb){
  var that = this;
    this.isUrlInList(url, function(result){
      if(result === false){
        cb(fs.appendFile(that.paths.list, url+'\n'));
      }
    });
  
};

// Check if target URL is present in archive folder.
exports.isUrlArchived = function(url, cb){
  fs.readFile(this.paths.archivedSites + '/' + url, function(error, data){
     if(error){
      cb(false);
     }else{
      cb(true);
     }
  });
}; 

//Archive the target URL.
exports.downloadUrls = function(urlList){
  var fixturePath = this.paths.archivedSites + "/";
  for(var i = 0; i < urlList.length; i++){
    fs.writeFile(fixturePath + urlList[i]);
  }
  //do GET request for each asset in url and store the files locally

};







