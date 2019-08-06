import axios from "axios";
import toast from "../tools/model/index.js";
import store from "../store";
const pageSize = store.state.pageSize;
let type = null;

const myAJAX = axios.create({
  baseURL: "http://www.nixingdongman",
  transformResponse: res => {
    const data = JSON.parse(res);
    if (data.status == 200) {
      if (data.count) {
        store.commit("setAllPage", [data.count, type]);
      }
      toast(2000, data.msg, "success");
      return data.data;
    } else {
      toast(2000, "失败", "fail");
    }
  }
});

// 查询所有学生
const selectAllStudent = () => {
  type = "all";
  return myAJAX({
    url: "/selectAllStudent",
    method: "get"
  });
};

// 通过页码查询所有学生
const selectStudentByPage = nowPage => {
  type = "all";
  return myAJAX({
    url: "/selectStudentByPage",
    method: "get",
    params: {
      nowPage,
      pageSize
    }
  });
};

// 提交学生信息
const insertStudentForm = formData => {
  return myAJAX({
    url: "/insertStudentForm",
    method: "post",
    data: formData
  });
};

// 通过关键词搜索学生信息
const selectStudentByKeyWords = keyWords => {
  type = "search";
  return myAJAX({
    url: "/selectStudentByKeyWords",
    method: "get",
    params: {
      keyWords
    }
  });
};
// 通过关键词和页码搜索学生信息
const selectStudentByKAndP = (keyWords, nowPage, pageSize) => {
  type = "search";
  return myAJAX({
    url: "/selectStudentByKAndP",
    method: "get",
    params: {
      keyWords,
      nowPage,
      pageSize
    }
  });
};

// 修改学生信息
const editStudentInfo = userInfo => {
  return myAJAX({
    url: "/editStudentInfo",
    method: "post",
    data: userInfo
  });
};

// 删除学生信息
const deleteStudentInfo = sNo => {
  return myAJAX({
    url: "/deleteStudentInfo",
    method: "get",
    params: {
      sNo
    }
  });
};

// 通过地名查询学生的数量
const selectCountByAddress = addr => {
  return myAJAX({
    url: "/selectCountByAddress",
    method: "get",
    params: {
      addr
    }
  });
};

// 查询用户账号密码
const selectUser = userInfo => {
  return myAJAX({
    url: "/selectUser",
    method: "post",
    data: userInfo
  });
};

// 创建用户账号密码
const insertUserInfo = userInfo => {
  return myAJAX({
    url: "/insertUserInfo",
    method: "post",
    data: userInfo
  });
};

// 读取图片
const selectImage = url => {
  return myAJAX({
    url: "/static/water/*",
    method: "get",
    params: {
      url
    }
  })
};

export default {
  selectAllStudent,
  selectStudentByPage,
  insertStudentForm,
  selectStudentByKeyWords,
  editStudentInfo,
  selectStudentByKAndP,
  deleteStudentInfo,
  selectCountByAddress,
  insertUserInfo,
  selectUser,
  selectImage
};
