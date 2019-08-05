let path = new Map();

// 读取图片
const selectImg = (request, response) => {
    response.sendFile(__dirname + "/" + request.url);
}

path.set("/selectImg", selectImg);

module.exports.path = path;