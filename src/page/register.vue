<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="registerForm"
    >
      <el-form-item label="账号" prop="user">
        <el-input v-model.number="ruleForm.user" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 只有callback()传入的值为空时验证才会通过
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        user: ""
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
        ],
        checkPass: [
          { required: true, message: "请输入密码" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const userInfo = JSON.parse(JSON.stringify(this.ruleForm));
          this.$api.insertUserInfo(userInfo).then( res => {
            console.log(res);
            if (res.data) {
              this.$router.push({path: "login"});
            };
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss' scoped>
.registerForm {
  width: 500px;
  margin: 50px auto;
}
</style>
