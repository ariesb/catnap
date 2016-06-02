'use strict';

var jsonfile = require('jsonfile');
var path = require('path');
var util = require('./util');

var readFn = function(folder) {
  var config = {};
  try {
    config = jsonfile.readFileSync(folder + path.sep + 'apidef.json');
  } catch (e) {
    return false;
  }
  return config;
};

var replacePath = function(path, dataPath) {
  var rPath = path;
  for (var pathVar in dataPath) {
    if (dataPath.hasOwnProperty(pathVar)) {
      var regx = new RegExp('@{' + pathVar + '}', 'gi');
      rPath = rPath.replace(regx, dataPath[pathVar]);
    }
  }

  return rPath;
};

var makeFn = function(config) {
  var endpointPath = replacePath(config.path,{
    "username": "testmakqa02",
    "password": "12345678"
  });
  var apiUrl = config.protocol + '://' + config.domain + (config.port || '') + endpointPath;
  return apiUrl;
};

module.exports = {
  get: readFn,
  make: makeFn
};
