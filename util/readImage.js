const fs = require("fs");
module.exports = {
    readImage: (path, res) => {
        fs.readFile(path, 'binary', (err, file) => {
            if (err) {
                console.log(error);
                return;
            } else {
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.write(file, 'binary');
                res.end();
            }
        });
    }
};