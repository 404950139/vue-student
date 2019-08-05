const dbUtil = require("./dbUtil");

// 查询用户账号密码
const selectUserInfoDao = (user, success) => {
  const selectQuery = "select psw from userInfo where user = ?";
  const params = [user];
  const connection = dbUtil();
  connection.connect();
  connection.query(selectQuery, params, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
};

// 注册用户账号密码
const insertUserInfoDao = (user, psw, success) => {
  const insertQuery = "insert into userInfo (`user`, `psw`) value(?, ?)";
  const params = [user, psw];
  const connection = dbUtil();
  connection.connect();
  connection.query(insertQuery, params, (error, result) => {
    if (error == null) {
      success(true);
    } else {
      console.log(error);
    }
  });
};

module.exports = {
  selectUserInfoDao,
  insertUserInfoDao
};
