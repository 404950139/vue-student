const dbUtil = require("./dbUtil");

// 查询数据库所有学生信息
const selectAllStudnetDao = success => {
  const selectQuery = "select * from studentList";
  const params = [];
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

/**
 * 通过页数查询数据库所有学生信息
 * nowPage  当前的页码
 * pageSize 每页显示的信息数
 * success  成功后的回调函数
 */
const selectStudentByPageDao = (nowPage, pageSize, success) => {
  const selectQuery = "select * from studentList limit ?, ?";
  const params = [parseInt(nowPage * pageSize), parseInt(pageSize)];
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

/**
 * 查询所有学生的条数
 */
const selectStudentByCountDao = success => {
  const selectQuery = "select count(*) from studentList";
  const params = [];
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

/**
 * 添加学生信息
 * sName    学生姓名
 * sSex     学生性别
 * sEmail   学生邮箱
 * sYear    学生出生年
 * sPhone   学生手机号
 * sAddress 学生地址
 * success  成功后的回调函数
 */
const insertStudentDao = (
  sName,
  sSex,
  sEmail,
  sYear,
  sPhone,
  sAddress,
  success
) => {
  const insertQuery =
    "insert into studentList (`sName`, `sSex`, `sEmail`, `sYear`, `sPhone`, `sAddress`) value (?, ?, ?, ?, ?, ?)";
  const params = [sName, sSex, sEmail, sYear, sPhone, sAddress];
  const connection = dbUtil();
  connection.connect();
  connection.query(insertQuery, params, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
};

/**
 * 通过关键词搜索
 * keyWords     关键词
 * success      成功回调函数
 */
const selectStudentByKeyWordsDao = (keyWords, success) => {
  const selectQuery = "select * from studentList where sName like ?";
  const params = [keyWords];
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

/**
 * 通过关键词和页码搜索学生信息
 * keyWords     关键词
 * nowPage  当前的页码
 * pageSize 每页显示的信息数
 * success      成功回调函数
 */
const selectStudentByKAndPDao = (keyWords, nowPage, pageSize, success) => {
  const selectQuery = "select * from studentList where sName like ? limit ?, ?";
  const params = [keyWords, parseInt(nowPage * pageSize), parseInt(pageSize)];
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

/**
 * 查询关键词的条数
 */
const selectStudentCountBykDao = (keyWords, success) => {
  const selectQuery = "select count(*) from studentList where sName like ?";
  const params = [keyWords];
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

// 修改学生信息
const editStudentInfoDao = (
  sName,
  sSex,
  sEmail,
  sYear,
  sPhone,
  sAddress,
  id,
  success
) => {
  const updateQuery =
    "UPDATE studentList SET sName = ?, sSex = ?, sEmail = ?, sYear = ?, sPhone = ?, sAddress = ? WHERE `id` = ?";
  const params = [sName, sSex, sEmail, sYear, sPhone, sAddress, id];
  const connection = dbUtil();
  connection.connect();
  connection.query(updateQuery, params, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
};

/**
 * 删除学生信息
 */
const deleteStudentDao = (sNo, success) => {
  const deleteQuery = "delete from studentList where id = ?";
  const params = [parseInt(sNo)];
  const connection = dbUtil();
  connection.connect();
  connection.query(deleteQuery, params, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
};

/**
 * 查询各地名的学生数量
 */
const selectCountByAddressDao = (address, success) => {
  const addr = address.split(",");
  const data = {};
  const connection = dbUtil();
  connection.connect();
  for (let i = 0; i < addr.length; i++) {
    const selectQuery = "select count(*) from studentList where `sAddress` = ?";
    const params = [addr[i]];
    connection.query(selectQuery, params, (error, result) => {
      if (error == null) {
        data[addr[i]] = result;
        if (i == addr.length - 1) {
          success(data);
        };
      } else {
        console.log(error);
      }
    });
    
  }
  connection.end();
};

module.exports = {
  selectAllStudnetDao,
  selectStudentByPageDao,
  insertStudentDao,
  selectStudentByKeyWordsDao,
  editStudentInfoDao,
  selectStudentByCountDao,
  selectStudentByKAndPDao,
  selectStudentCountBykDao,
  deleteStudentDao,
  selectCountByAddressDao
};
