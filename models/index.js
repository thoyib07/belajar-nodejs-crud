"use strict";

const dbConfig = require('../config/db.config.js');
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require('path');
const {fileURLToPath} = require("url");

// Buat Conneection
const conn = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASS,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool : dbConfig.pool
});

const db = {};

db.Sequelize = Sequelize;
db.conn = conn;
db.tutorial = require('./tutorialModel.js')(conn,Sequelize);
    
// console.info(db.tutorial);
// module.exports = { db };
module.exports = db;
// export default db;