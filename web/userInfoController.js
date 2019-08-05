const selectUserInfo = require("../dao/userInfo");
const writeResult = require("../util/responseUtil");
const url = require("url");
const crypto = require("crypto");

let path = new Map();

// 查询用户的账号密码
const selectUser = (request, response) => {
  request.on("data", data => {
    const qsData = JSON.parse(data.toString());
    selectUserInfo.selectUserInfoDao(qsData.user, res => {
      const verData = JSON.parse(JSON.stringify(res));
      // md5解密
      const verifysign = crypto
        .createHash("md5")
        .update(qsData.pass, "utf8")
        .digest("hex");
      let info = "";
      let isLogin = {};
      if (verifysign == verData[0].psw) {
        info = "登录成功";
        // 创建随机的token
        let token = Math.random().toString(36).substr(2);
        let tokenMd5 = crypto.createHash("md5").update(token).digest("hex");
        isLogin = {"token": tokenMd5, "login": true};
      } else {
        info = "用户名或密码错误";
        isLogin = {"login": false};
      }
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.write(writeResult.writeResult("200", info, isLogin));
      response.end();
    });
  });
};

// 创建用户账号密码
const insertUserInfo = (request, response) => {
  request.on("data", data => {
    const qsData = JSON.parse(data.toString());
    // md5加密
    const sign = qsData.pass;
    let md5 = crypto.createHash("md5");
    md5.update(sign);
    const psw = md5.digest("hex");
    selectUserInfo.insertUserInfoDao(qsData.user, psw, data => {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.write(writeResult.writeResult("200", "注册成功", data));
      response.end();
    });
  });
};

path.set("/selectUser", selectUser);
path.set("/insertUserInfo", insertUserInfo);

module.exports.path = path;
