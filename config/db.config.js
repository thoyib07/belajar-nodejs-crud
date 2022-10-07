"use strict";
const dotenv = require("dotenv");
dotenv.config();
let dbConfig = {
    HOST:process.env.HOST,
    USER:process.env.USERNAME,
    PASS:process.env.PASS,
    DB:process.env.DB,
    dialect:"mysql",
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = dbConfig;
// export default dbConfig;