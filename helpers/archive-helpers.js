var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

// returns a array of URLs in sites.txt
exports.readListOfUrls = function(){
  // use fs to access site.txt
  // confirm that file exists
  // if it exists, 
    // Loop through lines of sites.txt
    // Push each URL to array
    // return array
};

exports.isUrlInList = function(url, list){
  // loop through array of URLs
  // if url is in list, return true
  // else return false
};

exports.addUrlToList = function(url, list){
  // loop through array of URLs
  // if url is not in list
    // add to list
};

exports.isUrlArchived = function(url){
  // use fs to check if folder for URL exists in archives/sites/
  // return true if found
    // else return false
}; 

exports.downloadUrls = function(list){
  //if isUrlArchived == false 
    //archive the url
  //do GET request for each asset in url and store the files locally
};