"use strict";
exports.__esModule = true;
var process = require("process");
exports["default"] = (function () { return ({
    port: process.env.PORT,
    db_port: process.env.DB_PORT,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE
}); });
