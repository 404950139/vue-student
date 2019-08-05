const express = require("express");

const app = new express();

const loader = require("./loader");

app.use(express.static("./static/"));


app.all("*", function(req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.sendStatus(200);
  //让options尝试请求快速结束
  else next();
});

// 查询所有学生
app.get("/selectAllStudent", loader.get("/selectAllStudent"));
// 通过页码查询学生
app.get("/selectStudentByPage", loader.get("/selectStudentByPage"));
// 添加学生信息
app.post("/insertStudentForm", loader.get("/insertStudentForm"));
// 通过关键词查询学生
app.get("/selectStudentByKeyWords", loader.get("/selectStudentByKeyWords"));
// 通过关键词和页码搜索学生信息
app.get("/selectStudentByKAndP", loader.get("/selectStudentByKAndP"));
// 修改学生信息
app.post("/editStudentInfo", loader.get("/editStudentInfo"));
// 删除学生信息
app.get("/deleteStudentInfo", loader.get("/deleteStudentInfo"));
// 通过地名查询学生的数量
app.get("/selectCountByAddress", loader.get("/selectCountByAddress"));
// 查询用户的账号密码
app.post("/selectUser", loader.get("/selectUser"));
// 创建用户账号密码
app.post("/insertUserInfo", loader.get("/insertUserInfo"));
// 读取图片
app.get("/static/water/*", (req, res) => {
  res.sendFile( __dirname + "/" + req.url );
});

app.listen(8081, () => {
  console.log("服务器已启动");
});