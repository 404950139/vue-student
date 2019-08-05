import Vue from "vue";
import Router from "vue-router";
import Index from "@/layout/index";
import StudentList from "@/components/index/studentList";
import AddStudent from "@/components/index/addStudent";
import Blank from "@/layout/blank";
import Login from "@/page/login";
import Register from "@/page/register";
import Echart from "@/components/index/echart";
import store from "../store/";
import WaterImg from "@/page/waterImg";
import { getCookie } from "../../util/cookieUtil";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      redirect: "/studentList",
      meta: {
        requireAuth: false
      },
      children: [
        {
          path: "/studentList",
          name: "studentList",
          component: StudentList,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "/addStudent",
          name: "addStudent",
          component: AddStudent,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "/echart",
          name: "echart",
          component: Echart,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: "/blank",
      name: "blank",
      component: Blank,
      meta: {
        requireAuth: false
      },
      children: [
        {
          path: "login",
          name: "login",
          component: Login,
          meta: {
            requireAuth: false
          }
        },
        {
          path: "register",
          name: "register",
          component: Register,
          meta: {
            requireAuth: false
          }
        },
        {
          path: "waterImg",
          name: "waterImg",
          component: WaterImg,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
});

// 页面刷新时，重新赋值有没登录
if (getCookie("uid")) {
  store.commit("setToken", getCookie("uid"));
}

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断当前页面是否需要登录
  if (to.matched.some(r => r.meta.requireAuth)) {
    // 判断用户是否已经登录
    if (store.getters.isRight) {
      next();
    } else {
      next({
        path: "/blank/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;
