var path = require('path');

var appRoot = './app/';
var vendors = './libs/';

module.exports = {
  root: appRoot,
  vendors: vendors,
  main: appRoot + 'main.js',
  js: appRoot + '**/*.js',
  sassMain: appRoot + 'css/style.scss',
  sass: appRoot + 'css/**/*.scss',
  output: './dist/',
};
