const fs = require("fs");

const globalConfig = require("./configs");

const files = fs.readdirSync(globalConfig.web_path);

let pathMap = new Map();

for (let i = 0; i < files.length; i++) {
    let temp = require("./" + globalConfig.web_path + "/" + files[i]);
    if (temp.path) {
        for (let [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value);
            } else {
                throw new Error("url error: " + key);
            }
        }
    }
};

module.exports = pathMap;