var events = require('events'),
    util = require('util'),
    
    winston = require('winston'),
    Transport = winston.Transport,
    common =  require('winston/lib/winston/common');
var _dirname    = require('path').dirname;
var crate = require ('node-crate')


//
// ### function Memory (options)
// #### @options {Object} Options for this instance.
// Constructor function for the Memory transport object responsible
// for persisting log messages and metadata to a memory array of messages.
//
var Crate = exports.Crate = function (options) {
  Transport.call(this, options);
  options = options || {};

  this.errorOutput = [];
  this.writeOutput = [];

  this.json        = options.json        || false;
  this.colorize    = options.colorize    || false;
  this.prettyPrint = options.prettyPrint || false;
  this.timestamp   = typeof options.timestamp !== 'undefined' ? options.timestamp : false;
  this.label       = options.label       || null;
  this.source = options.source || _dirname( process.mainModule.filename ) || module.filename;

  if (this.json) {
    this.stringify = options.stringify || function (obj) {
      return JSON.stringify(obj, null, 2);
    };
  }
  if (options.connect){
    console.log ('use connect string ' + options.connect)
  
    crate.connect (options.connect)
  } else
    crate.connect ('http://localhost:4200')
  
  var schema = {log: { ts: 'timestamp', level: 'string', msg: 'string', meta: 'object (dynamic)', source: 'string'}};
  crate.create(schema)
            .success(function (res) {})
            .error(function (err) {});

};




//
// Inherit from `winston.Transport`.
//
util.inherits(Crate, winston.Transport );

//
// Expose the name of this Transport on the prototype
//
Crate.prototype.name = 'crate';

//
// ### function log (level, msg, [meta], callback)
// #### @level {string} Level at which to log the message.
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete.
// Core logging method exposed to Winston. Metadata is optional.
//


Crate.prototype.log = function (level, msg, meta, callback) {
  if (this.silent) {
    return callback(null, true);
  }

  var self = this,
      output;

  output = common.log({
    colorize:    this.colorize,
    json:        this.json,
    level:       level,
    message:     msg,
    meta:        meta,
    stringify:   this.stringify,
    timestamp:   this.timestamp,
    prettyPrint: this.prettyPrint,
    raw:         this.raw,
    label:       this.label
  });
  //console.log ("output " + output + ' source' + this.source)
  crate.insert ('log', {ts: new Date(), msg: msg, meta: meta, source: this.source})
    .success (function(e) {
      callback(null, true)
    }) 
    .error(function(e) {
      callback(e, false)
    })
  if (level === 'error' || level === 'debug') {
    this.errorOutput.push(output);
  } else {
    this.writeOutput.push(output);
  }

  self.emit('logged');
  ;
};

Crate.prototype.clearLogs = function () {
  // not required ?
};