const selectStudent = require("../dao/studentList");
const writeResult = require("../util/responseUtil");
const url = require("url");

let path = new Map();

// 查询所有学生列表
const selectAllStudent = (request, response) => {
  selectStudent.selectAllStudnetDao( data => {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write(writeResult.writeResult("200", "查询成功", data));
    response.end();
  });
};

// 通过页码查询所有学生信息
const selectStudentByPage = (request, response) => {
  const params = url.parse(request.url, true).query;
  // 查询所有学生的总数，以便于分页
  selectStudent.selectStudentByPageDao( params.nowPage, params.pageSize, data => {
      selectStudent.selectStudentByCountDao( res => {
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      response.write(writeResult.writeResultCount("200", "查询成功", data, res[0]['count(*)']));
      response.end();
    });
  });
};

// 添加学生信息
const insertStudentForm = (request, response) => {
  request.on("data", data => {
    const qsData = JSON.parse(data.toString());
    selectStudent.insertStudentDao(qsData.sName, qsData.sSex, qsData.sEmail, qsData.sYear, qsData.sPhone, qsData.sAddress, () => {
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      response.write(writeResult.writeResult("200", "插入成功", null));
      response.end();
    });
  });
};

// 通过关键词查询学生信息
const selectStudentByKeyWords = (request, response) => {
  const params = url.parse(request.url, true).query;
  const key = `%${params.keyWords}%`;
  selectStudent.selectStudentByKAndPDao(key, data => {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write(writeResult.writeResult("200", "查询成功", data));
    response.end();
  });
};

// 通过关键词和页码搜索学生信息
const selectStudentByKAndP = (request, response) => {
  const params = url.parse(request.url, true).query;
  const key = `%${params.keyWords}%`;
  selectStudent.selectStudentByKAndPDao(key, params.nowPage, params.pageSize, data => {
    // 查询关键词学生的总数，以便于分页
    selectStudent.selectStudentCountBykDao(key, res => {
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      response.write(writeResult.writeResultCount("200", "查询成功", data, res[0]['count(*)']));
      response.end();
    });
  });
}

// 修改学生信息
const editStudentInfo = (request, response) => {
  request.on("data", data => {
    const qsData = JSON.parse(data.toString());
    selectStudent.editStudentInfoDao(qsData.sName, qsData.sSex, qsData.sEmail, qsData.sYear, qsData.sPhone, qsData.sAddress, qsData.id, () => {
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      response.write(writeResult.writeResult("200", "修改成功", null));
      response.end();
    });
  });
}

// 删除学生信息
const deleteStudentInfo = (request, response) => {
  const params = url.parse(request.url, true).query;
  selectStudent.deleteStudentDao(params.sNo, () => {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write(writeResult.writeResult("200", "删除成功", null));
    response.end();
  });
};

// 查询各地名的学生数量
const selectCountByAddress = (request, response) => {
  const params = url.parse(request.url, true).query;
  selectStudent.selectCountByAddressDao(params.addr, data => {
    let d = {};
    for (let i in data) {
      d[i] = data[i][0]["count(*)"];
    }
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write(writeResult.writeResult("200", "查询成功", d));
    response.end();
  });
};

path.set("/selectAllStudent", selectAllStudent);
path.set("/selectStudentByPage", selectStudentByPage);
path.set("/insertStudentForm", insertStudentForm);
path.set("/selectStudentByKeyWords", selectStudentByKeyWords);
path.set("/editStudentInfo", editStudentInfo);
path.set("/selectStudentByKAndP", selectStudentByKAndP);
path.set("/deleteStudentInfo", deleteStudentInfo);
path.set("/selectCountByAddress", selectCountByAddress);



module.exports.path = path;
