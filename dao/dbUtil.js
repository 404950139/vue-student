const mysql = require("mysql");

let createConnection = () => {
    const connection = mysql.createConnection({
        // host: "localhost",
        // port: "3306",
        // user: "root",
        // password: "shi1505223675",
        // database: "student"
        host: "39.108.104.92",
        port: "3306",
        user: "student",
        password: "BCJPMdSwfxYPkWZt",
        database: "student"
    });
    return connection;
};

module.exports = createConnection;