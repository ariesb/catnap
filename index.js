'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var jsonfile = require('jsonfile');
var argv = require('yargs').argv;
var request = require('request');

var config = {};
if (argv.source) {
  try {
    config = jsonfile.readFileSync(argv.source);
  } catch (e) {
    console.log(chalk.red('Please provide valid test source definition.'));
  }
} else {
  console.log(chalk.red('Please provide test source definition.'));
}

console.log(config);

var reqdef = {
  method: config.method,
  uri: config.domain + config.endpoint,
  preambleCRLF: true,
  postambleCRLF: true,
};

request(reqdef,
    function(error, response, body) {
      // body is the decompressed response body
      // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
      // console.log('the decoded data is: ' + body)
      if(error) {
        console.log(error);
      }
    }
  ).on('data', function(data) {
    // decompressed data as it is received
    // console.log('decoded chunk: ' + data)
  })
  .on('response', function(response) {
    // unmodified http.IncomingMessage object
    response.on('data', function(data) {
      // compressed data as it is received
      //console.log('received ' + data.length + ' bytes of compressed data')
    })
  });
