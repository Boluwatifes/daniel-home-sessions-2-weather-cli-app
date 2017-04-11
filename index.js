'use strict'

let lib = require('./lib/app.js');
let chalk = require('chalk');
let inquirer = require('inquirer');
let figlet = require('figlet');


console.log(
  chalk.black.bgWhite(
    figlet.textSync('Simple Weather', { horizontalLayout: 'default' })
  )
);

lib.getType();