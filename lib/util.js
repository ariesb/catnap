'use strict';

var chalk = require('chalk');
var dateformat = require('dateformat');

var logFn = function() {
  var time = chalk.grey.bgWhite(' ') + chalk.grey(' ' + dateformat(new Date(), 'dd-mmm-yyyy HH:MM:ss') + ': ');
  process.stdout.write(time + ' ');
  console.log.apply(console, arguments);
  return this;
};

module.exports = {
  log: logFn
};
