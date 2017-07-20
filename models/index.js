'use strict';

require('dotenv').config();
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (process.env.CLEARDB_DATABASE_URL) {
  var sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL,{
    username:process.env.CLEARDB_DATABASE_USERNAME,
    password:process.env.CLEARDB_DATABASE_PASSWORD,
    database:process.env.CLEARDB_DATABASE,
    dialect: "mysql",
    logging:  true
  });
} else {
  var sequelize = new Sequelize(config.database, config.username, process.env.LOCAL_DATABASE_PASSWORD, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
