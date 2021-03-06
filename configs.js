const fs = require("fs");

let globalConfig = {};

const conf = fs.readFileSync("./server.conf");

const confArr = conf.toString().split("\n");

for (let i = 0; i < confArr.length; i++) {
    globalConfig[confArr[i].split("=")[0].trim()] = confArr[i].split("=")[1].trim();
};

module.exports = globalConfig;