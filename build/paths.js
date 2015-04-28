var path = require('path');

var appRoot = './app/';
var vendors = './libs/';

module.exports = {
  root: appRoot,
  vendors: vendors,
  main: appRoot + 'main.js',
  source: appRoot + '**/*.js',
  sass: 'css/**/*.scss',
  css: 'styles/**/*.css',
  output: './dist/',
};
