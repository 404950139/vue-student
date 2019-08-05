import Vue from "vue";
import Vuex from "vuex";
import { setCookie, getCookie} from "../../util/cookieUtil";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    showModel: false,
    editInfo: {},
    userInfo: [],
    nowPage: 1,
    pageSize: 10,
    count: "",
    allPage: 0,
    turnType: "",
    keyWord: "",
    token: ""
  },
  getters: {
    // 获取用户的token
    getToken: state => state.token,
    // 判断是否是正确的token
    isRight(state) {
      let nowCookie = getCookie("uid");
      let nowToken = state.token;
      if (nowCookie) {
        if (nowCookie == nowToken) {
          return true;
        } else {
          // 删除cookie
          setCookie("uid", "", -1);
        }
      } else {
        return false;
      }
    }
  },
  mutations: {
    // 改变模态框状态
    changeModel(state, val) {
      state.showModel = val;
    },
    // 设置模态框内容信息
    setEditInfo(state, val) {
      state.editInfo = val;
    },
    // 设置所有显示的学生信息
    setAllUserInfo(state, val) {
      state.userInfo = val;
    },
    // 获取所有显示的学生信息
    getAllUserInfo(state) {
      return state.userInfo;
    },
    // 设置总页码
    setAllPage(state, val) {
      state.allPage = Math.ceil(val[0] / state.pageSize);
      state.count = val[0];
      state.turnType = val[1];
    },
    // 设置搜索关键词
    setKeyWords(state, val) {
      state.keyWord = val;
    },
    // 设置当前页数
    setNowPage(state, val) {
      state.nowPage = val;
    },
    // 设置用户token
    setToken(state, val) {
      state.token = val;
    },
    // 存储cookie
    login(state, val) {
      // 设置cookie时间为5分钟
      const date = 1000 * 60 * 5;
      setCookie("uid", val.token, date);
      state.token = val.token;
    }
  },
  actions: {
    // 修改信息后改变表的学生信息
    changeTableList({ commit }, val) {
      let user = commit("getAllUserInfo");
      commit("setAllUserInfo", null);
      for (let i = 0; i < user.length; i++) {
        if (user[i].id === val.id) {
          user[i] = val;
          commit("setAllUserInfo", user);
          return;
        }
      }
    }
  }
});