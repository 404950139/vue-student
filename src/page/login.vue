<template>
  <div class="loginBox">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="user">
        <el-input v-model.number="ruleForm.user" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="turnRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value !== "") {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pass: ""
      },
      rules: {
        user: [
          { required: true, message: "请输入账号" },
          { type: "number", message: "账号只能为数字" },
          { validator: validateUser, trigger: "blur" }
        ],

        pass: [
          { required: true, message: "请输入密码" },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 判断所有规则是否都通过验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          const userInfo = JSON.parse(JSON.stringify(this.ruleForm));
          this.$api.selectUser(userInfo).then(res => {
            if (res.data.login) {
              this.$store.commit("login", res.data);
              const redirectPath = this.$router.history.current.query.redirect;
              if (redirectPath) {
                this.$router.push({ path: redirectPath });
              } else {
                this.$router.push({ path: "/studentList" });
              }
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 跳转到注册页面
    turnRegister() {
      this.$router.push({ path: "register" });
    }
  }
};
</script>

<style lang='scss' scoped>
.loginBox {
  width: 100%;
  .demo-ruleForm {
    width: 500px;
    margin: 50px auto;
  }
}
</style>
